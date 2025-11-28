import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { emitSubmitAnswer } from "../utils/socketActions"
import { setHasAnswered } from "../features/student/studentSlice"
import { useNavigate } from "react-router-dom"
import { toggleChat } from "../features/ui/uiSlice"
import ChatParticipantsPanel from "../components/ChatParticipantsPanel"

export default function StudentQuestion() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const q = useSelector(s=>s.poll.activeQuestion)
  const pollId = useSelector(s=>s.poll.pollId)
  const timer = useSelector(s=>s.poll.timer)
  const hasAnswered = useSelector(s=>s.student.hasAnswered)
  const showChat = useSelector(s => s.ui.isChatOpen)

  const [selected, setSelected] = useState("")
  
  useEffect(() => {
    // reset selection whenever a new question arrives
    setSelected("")
  }, [q?.question, q?.timeLimit])
  const submit = () => {
    if (!selected) return
    emitSubmitAnswer({ pollId, answer: selected })
    dispatch(setHasAnswered(true))
    navigate("/student/results")
  }

  const formatTimer = (s) => {
    if (s == null) return ''
    const mm = Math.floor(s / 60).toString().padStart(2,'0')
    const ss = (s % 60).toString().padStart(2,'0')
    return `${mm}:${ss}`
  }

  return (
    <>
    <div className="min-h-screen flex items-start justify-center px-6 py-16 bg-gray-50">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Question</h2>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-red-600">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-2xl font-bold text-red-600">{formatTimer(timer)}</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gray-700 text-white px-5 py-3 text-sm font-medium">{q?.question}</div>
          <div className="p-6 space-y-3">
            {q?.options?.map((o,i)=>{
              const isSelected = selected === o
              return (
                <div
                  key={i}
                  onClick={() => !hasAnswered && setSelected(o)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${isSelected ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${isSelected ? 'bg-white text-indigo-600' : 'bg-gray-300 text-gray-700'}`}>
                    {i+1}
                  </div>
                  <div className="text-base font-medium">{o}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          {!hasAnswered && (
            <button onClick={submit} disabled={!selected} className={`px-10 py-3 rounded-full text-white font-semibold transition-all ${selected ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg' : 'bg-gray-300 cursor-not-allowed'}`}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>

    <button onClick={()=>dispatch(toggleChat())} className="fixed bottom-6 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-colors" aria-pressed={showChat} aria-label="Toggle chat">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H8l-5 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"/>
      </svg>
    </button>

    {showChat && <ChatParticipantsPanel />}
    </>
  )
}
