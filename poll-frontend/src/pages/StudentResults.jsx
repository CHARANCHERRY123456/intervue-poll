import { useSelector } from "react-redux"

export default function StudentResults() {
  const results = useSelector(s=>s.poll.results)
  const q = useSelector(s=>s.poll.activeQuestion)

  return (
    <div className="p-8 max-w-xl mx-auto flex flex-col gap-5">
      <h2 className="text-xl font-semibold">{q?.question}</h2>

      {Object.keys(results).map((opt,i)=>(
        <div key={i} className="border p-3 rounded-lg flex justify-between">
          <span>{opt}</span>
          <span>{results[opt]}</span>
        </div>
      ))}
    </div>
  )
}
