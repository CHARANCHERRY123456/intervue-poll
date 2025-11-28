import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { removeToast } from "../features/ui/uiSlice"

export default function Toasts() {
  const toasts = useSelector(s => s.ui.toasts)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!toasts.length) return
    const timers = toasts.map(t => {
      const id = setTimeout(() => dispatch(removeToast(t.id)), 3500)
      return { id, toastId: t.id }
    })
    return () => timers.forEach(t => clearTimeout(t.id))
  }, [toasts])

  if (!toasts.length) return null

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="space-y-2">
        {toasts.map(t => (
          <div key={t.id} className="bg-gray-900 text-white px-4 py-2 rounded-md shadow-md min-w-[240px]">
            {t.message}
          </div>
        ))}
      </div>
    </div>
  )
}
