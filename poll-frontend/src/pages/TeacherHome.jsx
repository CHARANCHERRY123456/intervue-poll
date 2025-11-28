import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPollId, setActiveQuestion, setTimer } from "../features/poll/pollSlice"
import { setTeacher } from "../features/teacher/teacherSlice"
import { useCreatePollMutation } from "../features/poll/pollApi"
import { socket } from "../app/socket"
import { emitAskQuestion } from "../utils/socketActions"
import { useNavigate } from "react-router-dom"
import Logo from "../components/Logo"

export default function TeacherHome() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const pollId = useSelector(s => s.poll.pollId)

  const [createPoll] = useCreatePollMutation()

  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState([
    { text: "", isCorrect: true },
    { text: "", isCorrect: false }
  ])
  const [timeLimit, setTimeLimit] = useState(60)

  useEffect(() => {
    const saved = localStorage.getItem("pollId")

    if (!pollId && !saved) {
      createPoll("Teacher").then(res => {
        const id = res.data.pollId
        dispatch(setPollId(id))
        dispatch(setTeacher("Teacher"))
        socket.emit("teacher:join", id)
        socket.emit("join_room", id)
        localStorage.setItem("pollId", id)
      })
    } else {
      const id = pollId || saved
      dispatch(setPollId(id))
      dispatch(setTeacher("Teacher"))
      socket.emit("teacher:join", id)
      socket.emit("join_room", id)
    }
  }, [])

  const updateOption = (i, text) => {
    const arr = [...options]
    arr[i].text = text
    setOptions(arr)
  }

  const toggleCorrect = (i, value) => {
    const arr = [...options]
    arr[i].isCorrect = value
    setOptions(arr)
  }

  const addOption = () => {
    setOptions([...options, { text: "", isCorrect: false }])
  }

  const ask = () => {
    const optionTexts = options.map(o => o.text)
    const q = { question, options: optionTexts, timeLimit }

    // update teacher UI immediately so teacher doesn't rely on server echo
    dispatch(setActiveQuestion(q))
    dispatch(setTimer(timeLimit))
    navigate("/teacher/live")
    if (!pollId) {
      // pollId not ready yet — create one or warn
      console.warn("Poll ID not ready — cannot emit question yet")
      return
    }

    emitAskQuestion({ pollId, question, options: optionTexts, timeLimit })
  };


  const charCount = question.length

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Logo />

        {/* Display Poll ID */}
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700">
            <span className="font-semibold text-gray-900">Poll ID:</span> {pollId || "Loading..."}
          </p>
        </div>

        <div className="mt-8">
          <h1 className="text-4xl font-bold text-gray-900">Let's Get Started</h1>
          <p className="text-gray-500 mt-2">
            you'll have the ability to create and manage polls, ask questions, and monitor your students' responses in real-time.
          </p>
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <label className="text-base font-semibold text-gray-900">Enter your question</label>
              <div className="flex items-center gap-2">
                <select
                  value={timeLimit}
                  onChange={e => setTimeLimit(Number(e.target.value))}
                  className="text-sm bg-white border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value={30}>30 seconds</option>
                  <option value={60}>60 seconds</option>
                  <option value={90}>90 seconds</option>
                </select>
              </div>
          </div>

          <textarea
            className="w-full border border-gray-300 rounded-lg p-4 bg-gray-100 text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="4"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Rahul Bajaj"
            maxLength={100}
          />
          <div className="text-right text-sm text-gray-500 mt-1">{charCount}/100</div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">Edit Options</h3>
            <div className="flex flex-col gap-3">
              {options.map((opt, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold text-sm">
                    {i + 1}
                  </div>
                  <input
                    className="flex-1 border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={opt.text}
                    onChange={e => updateOption(i, e.target.value)}
                    placeholder="Rahul Bajaj"
                  />
                </div>
              ))}
              <button 
                onClick={addOption}
                className="text-purple-600 text-sm font-medium self-start mt-2 hover:text-purple-700"
              >
                + Add More option
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">Is it Correct?</h3>
            <div className="flex flex-col gap-3">
              {options.map((opt, i) => (
                <div key={i} className="flex items-center gap-4 h-[52px]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`correct-${i}`}
                      checked={opt.isCorrect}
                      onChange={() => toggleCorrect(i, true)}
                      className="w-5 h-5 text-purple-600 accent-purple-600"
                    />
                    <span className="text-gray-700 font-medium">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`correct-${i}`}
                      checked={!opt.isCorrect}
                      onChange={() => toggleCorrect(i, false)}
                      className="w-5 h-5 text-gray-400 accent-gray-400"
                    />
                    <span className="text-gray-700 font-medium">No</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <button 
            onClick={ask} 
            className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors"
          >
            Ask Question
          </button>
        </div>
      </div>
    </div>
  )
}
