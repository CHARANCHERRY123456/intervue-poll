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
  const [pollCode, setPollCode] = useState("global_poll")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onContinue = () => {
    const trimmedName = name.trim()
    const trimmedPoll = pollCode.trim()

    if (!trimmedName || !trimmedPoll) return

    // store in redux
    dispatch(setStudent({ id: null, name: trimmedName }))
    dispatch(setPollId(trimmedPoll))

    // store locally
    localStorage.setItem("studentName", trimmedName)
    localStorage.setItem("pollId", trimmedPoll)

    // join poll room
    try {
      emitJoinStudent({ pollId: trimmedPoll, name: trimmedName })
      socket.emit("join_room", trimmedPoll)
    } catch (_) {}

    navigate("/student/wait")
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-3xl text-center">
        <div className="mb-8">
          <Logo />
        </div>

        <h1 className="text-5xl font-extrabold text-gray-900">
          Let’s <span className="font-black">Get Started</span>
        </h1>

        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Enter your name and the <strong>Poll ID</strong> shared by your teacher to join the live poll.
        </p>

        <div className="mt-12 flex justify-center">
          <div className="w-full max-w-lg text-left">
            
            {/* Name Input */}
            <label className="block text-sm font-medium text-gray-700 mb-2">Enter your Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Rahul Bajaj"
              className="w-full bg-gray-100 rounded-md p-4 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* Poll ID Input */}
            {/* <label className="block text-sm font-medium text-gray-700 mt-6 mb-2">Enter Poll ID(Ask Your Teacher or go to /teacher)</label>
            <input
              value={pollCode}
              onChange={e => setPollCode(e.target.value)}
              placeholder="e.g., 8FD92K"
              className="w-full bg-gray-100 rounded-md p-4 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            /> */}

            <div className="mt-10 flex justify-center">
              <button
                onClick={onContinue}
                disabled={!name.trim() || !pollCode.trim()}
                className={`px-12 py-3 rounded-full text-white font-medium transition-shadow ${
                  name.trim() && pollCode.trim()
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
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
