import { BrowserRouter, Routes, Route } from "react-router-dom"
import RoleSelect from "./pages/RoleSelect.jsx"

function App() {
  return <h1 className="bg-blend-color-burn">Thinaava bro</h1>
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelect />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
