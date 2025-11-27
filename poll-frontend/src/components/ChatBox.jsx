import { useSelector } from "react-redux"
import { useState } from "react"
import { emitSendChat } from "../utils/socketActions"

export default function ChatBox() {
  const messages = useSelector(s=>s.ui.messages)
  const pollId = useSelector(s=>s.poll.pollId)
  const studentName = useSelector(s=>s.student.studentName)
  const teacher = useSelector(s=>s.teacher.isTeacher)

  const [text,setText] = useState("")

  const send = () => {
    if(!text.trim()) return
    emitSendChat({ pollId, user: teacher ? "Teacher" : studentName, message: text })
    setText("")
  }

  return (
    <div className="fixed bottom-4 right-4 w-72 bg-white shadow-lg rounded-xl p-4 flex flex-col gap-3">
      <div className="font-semibold">Chat</div>

      <div className="h-48 overflow-y-auto flex flex-col gap-2 border p-2 rounded-lg">
        {messages.map((m,i)=>(
          <div key={i} className="flex flex-col">
            <div className="text-xs text-gray-500">{m.user}</div>
            <div className="text-sm">{m.message}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="border p-2 rounded-lg flex-1"
          value={text}
          onChange={e=>setText(e.target.value)}
          placeholder="Type..."
        />
        <button onClick={send} className="bg-purple-600 text-white px-4 rounded-lg">Send</button>
      </div>
    </div>
  )
}
