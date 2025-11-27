import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isChatOpen: false,
  isParticipantsOpen: false,
  pageState: "idle",
  loading: false,
  messages: []
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleChat: (state) => { state.isChatOpen = !state.isChatOpen },
    toggleParticipants: (state) => { state.isParticipantsOpen = !state.isParticipantsOpen },
    addMessage: (state, action) => { state.messages.push(action.payload) },
    setPageState: (state, action) => { state.pageState = action.payload },
    setLoading: (state, action) => { state.loading = action.payload }
  }
})

export const { toggleChat, toggleParticipants, addMessage, setPageState, setLoading } = uiSlice.actions
export default uiSlice.reducer
