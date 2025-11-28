import { useSelector } from "react-redux"

export default function ParticipantsBadge({ className }) {
  const students = useSelector(s => s.poll.students || [])

  const display = students.slice(0, 3)
  const remaining = students.length - display.length

  return (
    <div className={`inline-flex items-center gap-3 ${className || ''}`}>
      <div className="flex -space-x-2 items-center">
        {display.map((s, i) => (
          <div key={s.id || i} className="w-9 h-9 rounded-full ring-2 ring-white bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-800 shadow" title={s.name}>
            {s.name ? s.name.charAt(0).toUpperCase() : "U"}
          </div>
        ))}
        {remaining > 0 && (
          <div className="w-9 h-9 rounded-full ring-2 ring-white bg-black text-white flex items-center justify-center text-sm font-semibold shadow">
            +{remaining}
          </div>
        )}
      </div>
      <div className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
        {students.length}
      </div>
    </div>
  )
}
