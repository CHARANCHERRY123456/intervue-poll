import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { emitAskQuestion, emitJoinTeacher } from "../utils/socketActions"
import { setPageState } from "../features/ui/uiSlice"
import { setPollId } from "../features/poll/pollSlice"
import { setTeacher } from "../features/teacher/teacherSlice"
import { useCreatePollMutation } from "../features/poll/pollApi"

export default function TeacherHome() {
  const dispatch = useDispatch()
  const pollId = useSelector(s => s.poll.pollId)
  const navigate = useNavigate()
  const [createPoll] = useCreatePollMutation()

  useEffect(() => {
    if (!pollId) {
      createPoll("Teacher").then(res => {
        if (res.data?.pollId) {
          const id = res.data.pollId
          dispatch(setPollId(id))
          dispatch(setTeacher("Teacher"))
          emitJoinTeacher(id)
        }
      })
    }
  }, [])

  const [question, setQuestion] = useState("what is 2?")
  const [options, setOptions] = useState(["1", "2", "1", "1"])
  const [timeLimit, setTimeLimit] = useState(60)

  const ask = () => {
    emitAskQuestion({ pollId, question, options, timeLimit })
    dispatch(setPageState("teacher_live"))
    navigate("/teacher/live")
  }



  return (
    <div className="p-8 flex flex-col gap-5 max-w-xl mx-auto">
      {pollId && <p className="text-center text-gray-600 font-semibold">Poll ID: <span className="text-purple-600">{pollId}</span></p>}
      <input value={question} onChange={(e)=>setQuestion(e.target.value)} placeholder="Enter question" className="border p-3 rounded-lg" />

      {options.map((opt, i) => (
        <input key={i} value={opt} onChange={(e)=> {
          const arr=[...options]; arr[i]=e.target.value; setOptions(arr)
        }} placeholder={`Option ${i+1}`} className="border p-3 rounded-lg" />
      ))}

      <select value={timeLimit} onChange={(e)=>setTimeLimit(Number(e.target.value))} className="border p-3 rounded-lg">
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
