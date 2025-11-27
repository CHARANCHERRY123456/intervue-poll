import { useState } from "react"
import { useDispatch } from "react-redux"
import { setStudent } from "../features/student/studentSlice"
import { setPollId } from "../features/poll/pollSlice"
import { emitJoinStudent } from "../utils/socketActions"
import { useNavigate } from "react-router-dom"

export default function StudentHome() {
  const [name, setName] = useState("")
  const [pollId, setPoll] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const join = () => {
    dispatch(setStudent({ id: null, name }))
    dispatch(setPollId(pollId))
    emitJoinStudent({ pollId, name })
    navigate("/student/wait")
  }

  return (
    <div className="p-8 flex flex-col gap-5 max-w-md mx-auto">
      <input className="border p-3 rounded-lg" value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" />
      <input className="border p-3 rounded-lg" value={pollId} onChange={e=>setPoll(e.target.value)} placeholder="Poll ID" />
      <button onClick={join} className="bg-blue-600 text-white py-3 rounded-xl text-lg">
        Join
      </button>
    </div>
  )
}
