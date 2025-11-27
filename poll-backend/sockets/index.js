import { Server } from "socket.io"
import registerPollHandlers from "./poll.socket.js"

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" }
  })

  io.on("connection", (socket) => {
    registerPollHandlers(io, socket)
  })
}
