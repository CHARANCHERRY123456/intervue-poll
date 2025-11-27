import { polls, students } from "../data/store.js"

export default function registerPollHandlers(io, socket) {
  socket.on("teacher:join", (pollId) => {
    socket.join(pollId)
    socket.emit("teacher:joined")
  })

  socket.on("student:join", ({ pollId, name }) => {
    if (!students[pollId]) students[pollId] = []
    students[pollId].push({ id: socket.id, name })
    socket.join(pollId)
    io.to(pollId).emit("students:update", students[pollId])
  })

  socket.on("teacher:ask_question", ({ pollId, question, options, timeLimit }) => {
      if (!polls[pollId]) return;
    const q = { question, options, timeLimit }
    polls[pollId].activeQuestion = q
    polls[pollId].currentResults = {}

    io.to(pollId).emit("question:new", q)

    let t = timeLimit
    const interval = setInterval(() => {
      t--
      io.to(pollId).emit("timer:update", t)

      if (t <= 0) {
        clearInterval(interval)
        io.to(pollId).emit("question:results", polls[pollId].currentResults)

        polls[pollId].history.push({
          question,
          options,
          results: polls[pollId].currentResults,
          endedAt: Date.now()
        })

        polls[pollId].activeQuestion = null
      }
    }, 1000)

    polls[pollId].interval = interval
  })

  socket.on("student:answer", ({ pollId, answer }) => {
    const r = polls[pollId].currentResults
    r[answer] = (r[answer] || 0) + 1
    io.to(pollId).emit("results:update", r)
  })

  socket.on("teacher:end_question", (pollId) => {
    const q = polls[pollId]
    if (!q || !q.activeQuestion) return
    clearInterval(q.interval)
    io.to(pollId).emit("question:results", q.currentResults)
    q.history.push({
      question: q.activeQuestion.question,
      options: q.activeQuestion.options,
      results: q.currentResults,
      endedAt: Date.now()
    })
    q.activeQuestion = null
  })

  socket.on("teacher:kick", ({ pollId, studentId }) => {
    io.to(studentId).emit("student:kicked")
    students[pollId] = students[pollId].filter(s => s.id !== studentId)
    io.to(pollId).emit("students:update", students[pollId])
    io.sockets.sockets.get(studentId)?.leave(pollId)
  })

  socket.on("chat:send", ({ pollId, user, message }) => {
    const msg = { user, message, time: Date.now() }
    io.to(pollId).emit("chat:new", msg)
  })

  socket.on("disconnect", () => {
    for (const pollId in students) {
      const list = students[pollId]
      const updated = list.filter(s => s.id !== socket.id)
      if (updated.length !== list.length) {
        students[pollId] = updated
        io.to(pollId).emit("students:update", updated)
      }
    }
  })
}
