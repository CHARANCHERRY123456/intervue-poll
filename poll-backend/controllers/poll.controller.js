import { polls } from "../data/store.js"

export const createPoll = (req, res) => {
  const id = Math.random().toString(36).substring(2, 8)
  polls[id] = {
    id,
    teacherName: req.body.teacherName,
    createdAt: Date.now(),
    history: []
  }
  res.json({ pollId: id })
}

export const getPoll = (req, res) => {
  const poll = polls[req.params.pollId]
  if (!poll) return res.status(404).json({ message: "Poll not found" })
  res.json(poll)
}

export const getPollHistory = (req, res) => {
  const poll = polls[req.params.pollId]
  if (!poll) return res.status(404).json({ message: "Poll not found" })
  res.json(poll.history)
}
