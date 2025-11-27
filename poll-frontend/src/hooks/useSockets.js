import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addMessage } from "../features/ui/uiSlice"

export const useSockets = () => {
  const dispatch = useDispatch()
  const pollId = useSelector((s) => s.poll.pollId)
  const navigate = useNavigate()

  useEffect(() => {
    if (!pollId) return

    socket.emit("join_room", pollId)

    socket.on("question:new", (q) => {
      dispatch(setActiveQuestion(q))
      navigate("/student/question")
    })

    socket.on("question:results", (r) => {
      dispatch(finalizeResults(r))
      navigate("/student/results")
      navigate("/teacher/results")
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
