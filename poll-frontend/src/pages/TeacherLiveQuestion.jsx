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


  return (
    <>
    <div className="p-8 max-w-xl mx-auto flex flex-col gap-5">
      <h2 className="text-xl font-semibold">{q?.question}</h2>
      <div className="text-2xl font-bold text-purple-600">{timer}s</div>

      {q?.options?.map((o,i)=>(
        <div key={i} className="p-3 border rounded-lg flex justify-between">
          <span>{o}</span>
          <span>{results[o] || 0}</span>
        </div>
      ))}
    </div>

    <button onClick={()=>dispatch(toggleChat())} className="fixed bottom-4 right-4 bg-purple-600 text-white p-4 rounded-full shadow-lg" aria-pressed={showChat} aria-label="Toggle chat">Chat</button>

    <button onClick={()=>dispatch(toggleParticipants())} className="fixed bottom-4 left-4 bg-blue-600 text-white p-4 rounded-full shadow-lg" aria-pressed={showPart} aria-label="Toggle participants">Users</button>

    {showChat && <ChatBox />}
    {showPart && <Participants />}
    </>
  )
}
