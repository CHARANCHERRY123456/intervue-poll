import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function RoleSelect() {
  const navigate = useNavigate()
  const [role, setRole] = useState(null)

  const select = (r) => {
    setRole(r)
  }

  const proceed = () => {
    if (role === "teacher") navigate("/teacher")
    if (role === "student") navigate("/student")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="mt-8" />

      <div className="flex flex-col items-center gap-4">
        <div className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 font-medium text-sm">
          Intervue Poll
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6">
          Welcome to the <span className="text-gray-900">Live Polling System</span>
        </h1>

        <p className="text-gray-500 mt-2 max-w-2xl text-center">
          Please select the role that best describes you to begin using the live polling system
        </p>
      </div>

      <div className="mt-12 w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Student Card */}
          <div
            onClick={() => select("student")}
            className={`cursor-pointer bg-white rounded-2xl p-8 transition-shadow relative ${
              role === "student"
                ? "ring-2 ring-purple-400 shadow-xl"
                : "shadow-md hover:shadow-lg"
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-800">I’m a Student</h3>
            <p className="text-gray-500 mt-3">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry
            </p>
          </div>

          {/* Teacher Card */}
          <div
            onClick={() => select("teacher")}
            className={`cursor-pointer bg-white rounded-2xl p-8 transition-shadow relative ${
              role === "teacher"
                ? "ring-2 ring-purple-400 shadow-xl"
                : "shadow-md hover:shadow-lg"
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-800">I’m a Teacher</h3>
            <p className="text-gray-500 mt-3">
              Submit answers and view live poll results in real-time.
            </p>
          </div>

        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={proceed}
            disabled={!role}
            className={`px-10 py-3 rounded-full text-white font-medium transition-opacity ${
              role
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 opacity-100"
                : "bg-gray-300 opacity-60 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
