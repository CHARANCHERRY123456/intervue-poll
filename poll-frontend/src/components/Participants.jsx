import { useSelector } from "react-redux"
import { emitKickStudent } from "../utils/socketActions"

export default function Participants() {
  const list = useSelector(s=>s.poll.students)
  const pollId = useSelector(s=>s.poll.pollId)
  const teacher = useSelector(s=>s.teacher.isTeacher)

  return (
    <div className="fixed bottom-4 left-4 w-72 bg-white shadow-lg rounded-xl p-4 flex flex-col gap-3">
      <div className="font-semibold">Participants</div>

      <div className="h-48 overflow-y-auto flex flex-col gap-2 border p-2 rounded-lg">
        {list.map((s)=>(
          <div key={s.id} className="flex justify-between items-center p-2 border rounded-lg">
            <span>{s.name}</span>
            {teacher && (
              <button
                onClick={()=>emitKickStudent({ pollId, studentId: s.id })}
                className="text-red-600 text-sm"
              >
                Kick
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
