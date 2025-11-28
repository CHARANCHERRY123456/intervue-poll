import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { emitSubmitAnswer } from "../utils/socketActions"
import { setHasAnswered } from "../features/student/studentSlice"
import { useNavigate } from "react-router-dom"
import { toggleChat, toggleParticipants } from "../features/ui/uiSlice"
import ChatBox from "../components/ChatBox"
import Participants from "../components/Participants"

export default function StudentQuestion() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const q = useSelector(s=>s.poll.activeQuestion)
  const pollId = useSelector(s=>s.poll.pollId)
  const timer = useSelector(s=>s.poll.timer)
  const hasAnswered = useSelector(s=>s.student.hasAnswered)
  const showChat = useSelector(s => s.ui.isChatOpen)
  const showPart = useSelector(s => s.ui.isParticipantsOpen)

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
    <div className="min-h-screen flex items-start justify-center px-6 py-12 bg-white">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Question {q?.number ?? 1}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-red-600">
              <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-red-600 font-medium">{formatTimer(timer)}</span>
          </div>
        </div>

        <div className="border border-purple-200 rounded-md overflow-hidden">
          <div className="bg-gray-800 text-white px-4 py-3 text-sm">{q?.question}</div>
          <div className="p-4 space-y-3 bg-white">
            {q?.options?.map((o,i)=>{
              const isSelected = selected === o
              return (
                <div
                  key={i}
                  onClick={() => !hasAnswered && setSelected(o)}
                  className={`flex items-center gap-4 p-3 rounded-md cursor-pointer border ${isSelected ? 'border-purple-400 bg-purple-50' : 'border-gray-200 bg-gray-50'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${isSelected ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-700'}`}>
                    {i+1}
                  </div>
                  <div className="text-gray-800">{o}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          {!hasAnswered && (
            <button onClick={submit} disabled={!selected} className={`px-8 py-3 rounded-full text-white font-medium ${selected ? 'bg-gradient-to-r from-purple-500 to-indigo-500 shadow-md' : 'bg-gray-300 cursor-not-allowed'}`}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>

    <button onClick={()=>dispatch(toggleChat())} className="fixed bottom-4 right-4 bg-purple-600 text-white p-4 rounded-full shadow-lg" aria-pressed={showChat} aria-label="Toggle chat">Chat</button>

    <button onClick={()=>dispatch(toggleParticipants())} className="fixed bottom-4 left-4 bg-blue-600 text-white p-4 rounded-full shadow-lg" aria-pressed={showPart} aria-label="Toggle participants">Users</button>

    {showChat && <ChatBox />}
    {showPart && <Participants />}
    </>
  )
}
