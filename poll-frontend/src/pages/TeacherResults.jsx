import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setPageState } from "../features/ui/uiSlice"
import { clearQuestion } from "../features/poll/pollSlice"

export default function TeacherResults() {
  const dispatch = useDispatch()
  const results = useSelector(s=>s.poll.results)
  const q = useSelector(s=>s.poll.activeQuestion)

  const next = () => {
    dispatch(clearQuestion())
    dispatch(setPageState("teacher_home"))
  }

  return (
    <div className="p-8 max-w-xl mx-auto flex flex-col gap-5">
      <h2 className="text-xl font-semibold">{q?.question}</h2>

      {Object.keys(results).map((opt,i)=>(
        <div key={i} className="border p-3 rounded-lg flex justify-between">
          <span>{opt}</span>
          <span>{results[opt]}</span>
        </div>
      ))}

      <button
        onClick={next}
        className="bg-purple-600 text-white py-3 rounded-xl text-lg mt-5"
      >
        Ask New Question
      </button>
    </div>
  )
}
