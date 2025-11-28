import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toggleChat, toggleParticipants } from "../features/ui/uiSlice"
import ChatBox from "../components/ChatBox"
import Participants from "../components/Participants"

export default function TeacherLiveQuestion() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const q = useSelector(s=>s.poll.activeQuestion)
  const results = useSelector(s=>s.poll.results)
  const timer = useSelector(s=>s.poll.timer)
  const showChat = useSelector(s => s.ui.isChatOpen)
  const showPart = useSelector(s => s.ui.isParticipantsOpen)

  useEffect(()=>{
    if (timer === 0 && q) navigate("/teacher/results")
  }, [timer])

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <>
    <div className="min-h-screen flex items-start justify-center px-6 py-16 bg-gray-50">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Live Question</h2>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-indigo-600">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-2xl font-bold text-indigo-600">{formatTimer(timer)}</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gray-700 text-white px-5 py-3 text-sm font-medium">{q?.question}</div>
          <div className="p-6 space-y-3">
            {q?.options?.map((o,i)=>{
              const voteCount = results[o] || 0
              return (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-gray-100 text-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-sm font-semibold shrink-0">
                      {i+1}
                    </div>
                    <div className="text-base font-medium">{o}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-indigo-600">{voteCount} {voteCount === 1 ? 'vote' : 'votes'}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>

    <button onClick={()=>dispatch(toggleChat())} className="fixed bottom-6 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-colors" aria-pressed={showChat} aria-label="Toggle chat">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H8l-5 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"/>
      </svg>
    </button>

    {showChat && <ChatBox />}
    {showPart && <Participants />}
    </>
  )
}
