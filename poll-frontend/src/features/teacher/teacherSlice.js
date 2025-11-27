import { createSlice } from "@reduxjs/toolkit"

const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    teacherName: "",
    isTeacher: false
  },
  reducers: {
    setTeacher: (state, action) => {
      state.teacherName = action.payload
      state.isTeacher = true
    }
  }
})

export const { setTeacher } = teacherSlice.actions

export default teacherSlice.reducer
