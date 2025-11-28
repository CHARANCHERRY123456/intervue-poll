import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { socket } from "../app/socket"
import { addMessage, pushToast } from "../features/ui/uiSlice"
import { setHasAnswered } from "../features/student/studentSlice"
import { 
  setActiveQuestion,
  setResults,
  setTimer,
  setStudents,
  finalizeResults,
  clearActiveQuestion
} from "../features/poll/pollSlice"
import { setKicked } from "../features/student/studentSlice";

export const useSockets = () => {
  const dispatch = useDispatch()
  const pollId = useSelector((s) => s.poll.pollId)
  const isTeacher = useSelector((s) => s.teacher.isTeacher)
  const navigate = useNavigate()

  useEffect(() => {
    if (!pollId) return

    socket.on("question:new", (q) => {
      // Reset student answered state so students can answer new question
      dispatch(setHasAnswered(false))
      dispatch(setActiveQuestion(q))
      if (isTeacher) navigate("/teacher/live")
      else {
        // show a small toast for students
        // dispatch(pushToast({ id: Date.now(), message: "New question posted" }))
        navigate("/student/question")
      }
    })

    socket.on("timer:update", (t) => {
      dispatch(setTimer(t))
    })

    socket.on("results:update", (r) => {
      dispatch(setResults(r))
    })
     socket.on("question:cleared", () => {
      dispatch(clearActiveQuestion())
    })

    socket.on("question:results", (r) => {
      dispatch(finalizeResults(r))
      if (isTeacher) navigate("/teacher/results")
      else navigate("/student/results")
    })

    socket.on("students:update", (list) => {
      dispatch(setStudents(list))
    })

    socket.on("student:kicked", () => {
      dispatch(setKicked())
      navigate("/student/kicked")
    })

    socket.on("chat:new", (msg) => {
      dispatch(addMessage(msg))
    })

    return () => {
      socket.off("question:new")
      socket.off("timer:update")
      socket.off("results:update")
      socket.off("question:results")
      socket.off("students:update")
      socket.off("student:kicked")
      socket.off("question:cleared")
      socket.off("chat:new")
    }
  }, [pollId, isTeacher])
}
