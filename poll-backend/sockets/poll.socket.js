import { polls, students, ensurePoll, addQuestionToHistory } from "../data/store.js"

export default function registerPollHandlers(io, socket) {
  socket.on("join_room", (pollId) => {
    socket.join(pollId)
  })

  socket.on("teacher:join", (pollId) => {
    socket.join(pollId)
    socket.emit("teacher:joined")
  })

  socket.on("student:join", ({ pollId, name }) => {
    if (!students[pollId]) students[pollId] = []
    students[pollId].push({ id: socket.id, name })
    socket.join(pollId)
    io.to(pollId).emit("students:update", students[pollId])
    // Inform the joining socket which poll it joined (helpful for clients in production)
    socket.emit("student:joined", { pollId })
    console.log(`student joined: ${name} -> ${pollId}`)
    // If there's an active question for this poll, send it immediately to this joining socket
    const poll = polls[pollId]
    if (poll && poll.activeQuestion) {
      // send the active question, current remaining timer, and current results to the joining student
      const remaining = typeof poll.remaining === 'number' ? poll.remaining : poll.activeQuestion.timeLimit
      socket.emit("question:new", poll.activeQuestion)
      socket.emit("timer:update", remaining)
      socket.emit("results:update", poll.currentResults || {})
    }
  })

  socket.on("teacher:ask_question", ({ pollId, question, options, timeLimit }) => {
    ensurePoll(pollId)
    console.log(`teacher asked question for poll ${pollId}: ${question}`)
    const q = { question, options, timeLimit }
    // clear any existing interval for this poll to avoid duplicate timers
    if (polls[pollId].interval) {
      clearInterval(polls[pollId].interval)
      polls[pollId].interval = null
    }
    polls[pollId].activeQuestion = q
    polls[pollId].currentResults = {}
    polls[pollId].answeredStudents = new Set()

    io.to(pollId).emit("question:new", q)

    let t = timeLimit
    polls[pollId].remaining = t
    io.to(pollId).emit("timer:update", t)
    io.to(pollId).emit("results:update", polls[pollId].currentResults || {})
    
    const interval = setInterval(() => {
      t--
      polls[pollId].remaining = t
      io.to(pollId).emit("timer:update", t)

      if (t <= 0) {
        clearInterval(interval)
        io.to(pollId).emit("question:results", polls[pollId].currentResults)

        addQuestionToHistory(pollId, question, options, polls[pollId].currentResults)

        polls[pollId].activeQuestion = null
        polls[pollId].remaining = null
        polls[pollId].answeredStudents.clear()
      }
    }, 1000)

    polls[pollId].interval = interval
  })

  socket.on("student:answer", ({ pollId, answer }) => {
    ensurePoll(pollId)
    const r = polls[pollId].currentResults || {}
    r[answer] = (r[answer] || 0) + 1
    polls[pollId].currentResults = r
    io.to(pollId).emit("results:update", r)

    // Track which student answered
    polls[pollId].answeredStudents.add(socket.id)
    
    // Check if all students have answered
    const totalStudents = students[pollId] ? students[pollId].length : 0
    const answeredCount = polls[pollId].answeredStudents.size
    
    if (totalStudents > 0 && answeredCount >= totalStudents) {
      // All students answered, end the question immediately
      if (polls[pollId].interval) {
        clearInterval(polls[pollId].interval)
        polls[pollId].interval = null
      }
      
      io.to(pollId).emit("question:results", polls[pollId].currentResults)
      
      addQuestionToHistory(pollId, polls[pollId].activeQuestion.question, polls[pollId].activeQuestion.options, polls[pollId].currentResults)
      
      polls[pollId].activeQuestion = null
      polls[pollId].remaining = null
      polls[pollId].answeredStudents.clear()
    }
  })
  socket.on("teacher:new_question", (pollId) => {
    if (polls[pollId]) {
      polls[pollId].activeQuestion = null
      polls[pollId].currentResults = {}
      if (polls[pollId].interval) {
        clearInterval(polls[pollId].interval)
        polls[pollId].interval = null
      }
      polls[pollId].remaining = null
      polls[pollId].answeredStudents = new Set()
    }
    io.to(pollId).emit("question:cleared")
  })

  socket.on("teacher:end_question", (pollId) => {
    ensurePoll(pollId)
    const q = polls[pollId]
    if (!q || !q.activeQuestion) return
    if (q.interval) {
      clearInterval(q.interval)
      q.interval = null
    }
    io.to(pollId).emit("question:results", q.currentResults)
    q.remaining = null
    
    addQuestionToHistory(pollId, q.activeQuestion.question, q.activeQuestion.options, q.currentResults)
    
    q.activeQuestion = null
    q.answeredStudents.clear()
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
