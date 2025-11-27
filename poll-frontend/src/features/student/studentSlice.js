import { createSlice } from "@reduxjs/toolkit"

const studentSlice = createSlice({
  name: "student",
  initialState: {
    studentId: null,
    studentName: "",
    hasAnswered: false,
    isKicked: false
  },
  reducers: {
    setStudent: (state, action) => {
      state.studentId = action.payload.id
      state.studentName = action.payload.name
    },
    setHasAnswered: (state, action) => {
      state.hasAnswered = action.payload
    },
    setKicked: (state) => {
      state.isKicked = true
    }
  }
})

export const {
  setStudent,
  setHasAnswered,
  setKicked
} = studentSlice.actions

export default studentSlice.reducer
