import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  pollId: null,
  activeQuestion: null,
  results: {},
  timer: 0,
  students: [],
  history: []
}

const pollSlice = createSlice({
  name: "poll",
  initialState,
  reducers: {
    setPollId: (state, action) => {
      state.pollId = action.payload
    },

    setActiveQuestion: (state, action) => {
      state.activeQuestion = action.payload
      state.results = {}
      state.timer = action.payload.timeLimit
    },

    clearActiveQuestion: (state) => {
      state.activeQuestion = null
      state.results = {}
      state.timer = 0
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
    },

    finalizeResults: (state, action) => {
      state.results = action.payload
      state.timer = 0
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
  setHistory,
  finalizeResults
} = pollSlice.actions

export default pollSlice.reducer
