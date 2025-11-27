import { useState } from "react"
import { useDispatch } from "react-redux"
import { setStudent } from "../features/student/studentSlice"
import { setPollId } from "../features/poll/pollSlice"
import { emitJoinStudent } from "../utils/socketActions"
import { socket } from "../app/socket"
import { useNavigate } from "react-router-dom"
import Logo from "../components/Logo"

export default function StudentHome() {
  const [name, setName] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onContinue = () => {
    const trimmed = name.trim()
    if (!trimmed) return

    // store locally and in redux
    localStorage.setItem("studentName", trimmed)
    dispatch(setStudent({ id: null, name: trimmed }))

    const pollId = localStorage.getItem("pollId")
    if (pollId) {
      dispatch(setPollId(pollId))
      try {
        emitJoinStudent({ pollId, name: trimmed })
        socket.emit("join_room", pollId)
      } catch (e) {
        // socket may not be available in tests — ignore
      }
    }

    navigate("/student/wait")
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-3xl text-center">
        <div className="mb-8">
          <Logo />
        </div>

        <h1 className="text-5xl font-extrabold text-gray-900">Let’s <span className="font-black">Get Started</span></h1>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">If you’re a student, you’ll be able to <strong>submit your answers</strong>, participate in live polls, and see how your responses compare with your classmates</p>

        <div className="mt-12 flex justify-center">
          <div className="w-full max-w-lg text-left">
            <label className="block text-sm font-medium text-gray-700 mb-2">Enter your Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Rahul Bajaj"
              className="w-full bg-gray-100 rounded-md p-4 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="mt-10 flex justify-center">
              <button
                onClick={onContinue}
                disabled={!name.trim()}
                className={`px-12 py-3 rounded-full text-white font-medium transition-shadow ${name.trim() ? 'bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
