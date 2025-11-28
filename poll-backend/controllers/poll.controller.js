import { polls, ensurePoll, getHistory } from "../data/store.js"

export const createPoll = (req, res) => {
  const id = Math.random().toString(36).substring(2, 8)
  ensurePoll(id)
  polls[id].id = id
  polls[id].teacherName = req.body.teacherName
  polls[id].createdAt = Date.now()
  res.json({ pollId: id })
}

export const getPoll = (req, res) => {
  const pollId = req.params.pollId
  ensurePoll(pollId)
  const poll = polls[pollId]
  if (!poll) return res.status(404).json({ message: "Poll not found" })
  res.json(poll)
}

export const getPollHistory = (req, res) => {
  const pollId = req.params.pollId
  const history = getHistory(pollId)
  res.json(history)
}
