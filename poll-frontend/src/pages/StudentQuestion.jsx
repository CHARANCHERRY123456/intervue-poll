import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { emitSubmitAnswer } from "../utils/socketActions"
import { setHasAnswered } from "../features/student/studentSlice"
import { useNavigate } from "react-router-dom"

export default function StudentQuestion() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const q = useSelector(s=>s.poll.activeQuestion)
  const pollId = useSelector(s=>s.poll.pollId)
  const timer = useSelector(s=>s.poll.timer)
  const hasAnswered = useSelector(s=>s.student.hasAnswered)

  const [selected, setSelected] = useState("")

  const submit = () => {
    emitSubmitAnswer({ pollId, answer: selected })
    dispatch(setHasAnswered(true))
    navigate("/student/results")
  }

  return (
    <div className="p-8 max-w-xl mx-auto flex flex-col gap-5">
      <h2 className="text-xl font-semibold">{q?.question}</h2>
      <div className="text-2xl font-bold text-blue-600">{timer}s</div>

      {q?.options.map((o,i)=>(
        <label key={i} className="p-3 border rounded-lg flex gap-3 items-center cursor-pointer">
          <input type="radio" name="opt" value={o} disabled={hasAnswered} onChange={()=>setSelected(o)} />
          {o}
        </label>
      ))}

      {!hasAnswered && (
        <button onClick={submit} disabled={!selected} className="bg-blue-600 text-white py-3 rounded-xl text-lg">
          Submit
        </button>
      )}
    </div>
  )
}
