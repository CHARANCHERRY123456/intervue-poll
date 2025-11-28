import { useSelector, useDispatch } from "react-redux"
import { toggleChat } from "../features/ui/uiSlice"
import ChatParticipantsPanel from "../components/ChatParticipantsPanel"

export default function StudentResults() {
  const dispatch = useDispatch()
  const results = useSelector(s=>s.poll.results)
  const q = useSelector(s=>s.poll.activeQuestion)
  const showChat = useSelector(s => s.ui.isChatOpen)

  return (
    <>
    <div className="p-8 max-w-xl mx-auto flex flex-col gap-5">
      <h2 className="text-xl font-semibold">{q?.question}</h2>

      {Object.keys(results).map((opt,i)=>(
        <div key={i} className="border p-3 rounded-lg flex justify-between">
          <span>{opt}</span>
          <span>{results[opt]}</span>
        </div>
      ))}
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
