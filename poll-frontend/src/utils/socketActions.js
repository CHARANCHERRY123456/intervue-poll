import { socket } from "../app/socket"

export const emitJoinStudent = (payload) => {
  socket.emit("student:join", payload)
}

export const emitJoinTeacher = (pollId) => {
  socket.emit("teacher:join", pollId)
}

export const emitAskQuestion = (payload) => {
  socket.emit("teacher:ask_question", payload)
}

export const emitSubmitAnswer = (payload) => {
  console.log(payload);
  
  socket.emit("student:answer", payload)
}

export const emitEndQuestion = (pollId) => {
  socket.emit("teacher:end_question", pollId)
}

export const emitKickStudent = (payload) => {
  socket.emit("teacher:kick", payload)
}

export const emitSendChat = (payload) => {
  socket.emit("chat:send", payload)
}
