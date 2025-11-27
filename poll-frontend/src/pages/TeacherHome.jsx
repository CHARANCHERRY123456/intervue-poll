import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPollId } from "../features/poll/pollSlice"
import { useCreatePollMutation } from "../features/poll/pollApi"
import { socket } from "../app/socket"
import { emitAskQuestion } from "../utils/socketActions"
import { useNavigate } from "react-router-dom"

export default function TeacherHome() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const pollId = useSelector(s => s.poll.pollId)

  const [createPoll] = useCreatePollMutation()

  const [question, setQuestion] = useState("what is your favorite color?")
  const [options, setOptions] = useState(["red", "blue", "white", "green"])
  const [timeLimit, setTimeLimit] = useState(60)

  useEffect(() => {
    const saved = localStorage.getItem("pollId")

    if (!pollId && !saved) {
      createPoll("Teacher").then(res => {
        const id = res.data.pollId
        dispatch(setPollId(id))
        socket.emit("teacher:join", id)
        socket.emit("join_room", id)
        localStorage.setItem("pollId", id)
      })
    } else {
      const id = pollId || saved
      dispatch(setPollId(id))
      socket.emit("teacher:join", id)
      socket.emit("join_room", id)
    }
  }, [])

  const ask = () => {
    emitAskQuestion({ pollId, question, options, timeLimit })
    navigate("/teacher/live")
  }

  return (
    <div className="p-8 flex flex-col gap-5 max-w-xl mx-auto">
      <p className="text-gray-700">Poll ID: {pollId}</p>

      <input className="border p-3 rounded-lg" value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Question" />

      {options.map((opt, i) => (
        <input
          key={i}
          className="border p-3 rounded-lg"
          value={opt}
          onChange={e => {
            const arr = [...options]
            arr[i] = e.target.value
            setOptions(arr)
          }}
          placeholder={`Option ${i + 1}`}
        />
      ))}

      <select className="border p-3 rounded-lg" value={timeLimit} onChange={e=>setTimeLimit(Number(e.target.value))}>
        <option value={30}>30s</option>
        <option value={60}>60s</option>
        <option value={90}>90s</option>
      </select>

      <button onClick={ask} className="bg-purple-600 text-white py-3 rounded-xl text-lg">
        Ask Question
      </button>
    </div>
  )
}
