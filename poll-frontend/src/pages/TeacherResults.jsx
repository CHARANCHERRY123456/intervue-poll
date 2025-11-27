import { useSelector, useDispatch } from "react-redux"
import { clearActiveQuestion } from "../features/poll/pollSlice"
import { socket } from "../app/socket"
import { useNavigate } from "react-router-dom"

export default function TeacherResults() {
  const pollId = useSelector(s => s.poll.pollId)
  const question = useSelector(s => s.poll.activeQuestion)
  const results = useSelector(s => s.poll.results)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const askNew = () => {
    socket.emit("teacher:new_question", pollId)
    dispatch(clearActiveQuestion())
    navigate("/teacher")
  }

  return (
    <div className="p-8 max-w-xl mx-auto flex flex-col gap-5">
      <h2 className="text-xl font-semibold">{question?.question}</h2>

      {question?.options?.map((opt, i) => (
        <div key={i} className="border p-3 rounded-lg flex justify-between">
          <span>{opt}</span>
          <span>{results[opt] || 0}</span>
        </div>
      ))}

      <button onClick={askNew} className="bg-purple-600 text-white py-3 rounded-xl text-lg mt-6">
        Ask New Question
      </button>
    </div>
  )
}
