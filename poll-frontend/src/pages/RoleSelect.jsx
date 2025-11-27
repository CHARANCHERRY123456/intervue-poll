import { useDispatch } from "react-redux"
import { setTeacher } from "../features/teacher/teacherSlice"
import { useNavigate } from "react-router-dom"

export default function RoleSelect() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleTeacher = () => {
    dispatch(setTeacher({ name: "Teacher" }))
    navigate("/teacher")
  }

  const handleStudent = () => {
    navigate("/student")
  }

  return (
    <div className="flex flex-col items-center gap-6 p-10">
      <button onClick={handleTeacher} className="bg-purple-500 text-white px-10 py-4 rounded-xl text-xl">I’m a Teacher</button>
      <button onClick={handleStudent} className="bg-blue-500 text-white px-10 py-4 rounded-xl text-xl">I’m a Student</button>
    </div>
  )
}
