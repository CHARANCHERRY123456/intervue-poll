import { createSlice } from "@reduxjs/toolkit"

const pollSlice = createSlice({
  name: "poll",
  initialState: {
    pollId: null,
    activeQuestion: null,
    results: {},
    timer: 0,
    students: [],
    history: []
  },
  reducers: {
    setPollId: (state, action) => {
      state.pollId = action.payload
    },
    setActiveQuestion: (state, action) => {
      state.activeQuestion = action.payload
    },
    clearActiveQuestion: (state) => {
      state.activeQuestion = null
    },
    setResults: (state, action) => {
      state.results = action.payload
    },
    setTimer: (state, action) => {
      state.timer = action.payload
    },
    setStudents: (state, action) => {
      state.students = action.payload
    },
    setHistory: (state, action) => {
      state.history = action.payload
    }
  }
})

export const {
  setPollId,
  setActiveQuestion,
  clearActiveQuestion,
  setResults,
  setTimer,
  setStudents,
  setHistory
} = pollSlice.actions

export default pollSlice.reducer
