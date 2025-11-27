import { useSelector } from "react-redux"

export default function TeacherLiveQuestion() {
  const q = useSelector(s=>s.poll.activeQuestion)
  const results = useSelector(s=>s.poll.results)
  const timer = useSelector(s=>s.poll.timer)

  useEffect(()=>{
    if (timer === 0 && q) navigate("/teacher/results")
  }, [timer])


  return (
    <div className="p-8 max-w-xl mx-auto flex flex-col gap-5">
      <h2 className="text-xl font-semibold">{q?.question}</h2>
      <div className="text-2xl font-bold text-purple-600">{timer}s</div>

      {q?.options.map((o,i)=>(
        <div key={i} className="p-3 border rounded-lg flex justify-between">
          <span>{o}</span>
          <span>{results[o] || 0}</span>
        </div>
      ))}
    </div>
  )
}
