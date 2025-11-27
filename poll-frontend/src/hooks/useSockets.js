import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { socket } from "../app/socket"
import { addMessage } from "../features/ui/uiSlice"
import { setActiveQuestion, setResults } from "../features/poll/pollSlice"
import { setKicked } from "../features/student/studentSlice"

export const useSockets = () => {
  const dispatch = useDispatch()
  const pollId = useSelector((s) => s.poll.pollId)
  const isTeacher = useSelector((s) => s.teacher.isTeacher)
  const navigate = useNavigate()

  useEffect(() => {
    if (!pollId) return

    socket.on("question:new", (q) => {
      dispatch(setActiveQuestion(q))
      if (isTeacher) navigate("/teacher/live")
      else navigate("/student/question")
    })

    socket.on("question:results", (r) => {
      dispatch(setResults(r))
      if (isTeacher) navigate("/teacher/results")
      else navigate("/student/results")
    })

    socket.on("student:kicked", () => {
      dispatch(setKicked())
      navigate("/student/kicked")
    })

    // Chat listener
    socket.on("chat:new", (msg) => {
      dispatch(addMessage(msg))
    })

    return () => {
      socket.off("question:new")
      socket.off("question:results")
      socket.off("student:kicked")
      socket.off("chat:new")
    }
  }, [pollId])
}
