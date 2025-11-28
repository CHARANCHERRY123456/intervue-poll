import { BrowserRouter, Routes, Route } from "react-router-dom"
import RoleSelect from "./pages/RoleSelect"
import TeacherHome from "./pages/TeacherHome"
import TeacherLiveQuestion from "./pages/TeacherLiveQuestion"
import TeacherResults from "./pages/TeacherResults"
import PollHistory from "./pages/PollHistory"
import StudentHome from "./pages/StudentHome"
import WaitingRoom from "./pages/WaitingRoom"
import StudentQuestion from "./pages/StudentQuestion"
import StudentResults from "./pages/StudentResults"
import Kicked from "./pages/kicked"
import { useSockets } from "./hooks/useSockets"
import Toasts from "./components/Toasts"

export default function App() {
  function SocketManager() {
    useSockets()
    return null
  }

  return (
    <BrowserRouter>
      <SocketManager />
      <Toasts />
      <Routes>
        <Route path="/" element={<RoleSelect />} />

        <Route path="/teacher" element={<TeacherHome />} />
        <Route path="/teacher/live" element={<TeacherLiveQuestion />} />
        <Route path="/teacher/results" element={<TeacherResults />} />
        <Route path="/teacher/history" element={<PollHistory />} />

        <Route path="/student" element={<StudentHome />} />
        <Route path="/student/wait" element={<WaitingRoom />} />
        <Route path="/student/question" element={<StudentQuestion />} />
        <Route path="/student/results" element={<StudentResults />} />
        <Route path="/student/kicked" element={<Kicked />} />
      </Routes>
    </BrowserRouter>
  )
}
