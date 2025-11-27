import { configureStore } from "@reduxjs/toolkit"
import pollReducer from "../features/poll/pollSlice.js"
import studentReducer from "../features/student/studentSlice.js"
import teacherReducer from "../features/teacher/teacherSlice.js"
import uiReducer from "../features/ui/uiSlice.js"

export default configureStore({
  reducer: {
    poll: pollReducer,
    student: studentReducer,
    teacher: teacherReducer,
    ui: uiReducer
  }
})
