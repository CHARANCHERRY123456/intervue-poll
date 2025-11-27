import { polls, students } from "../data/store.js"

export const createStudent = (req, res) => {
  const { pollId, studentName } = req.body
  if (!polls[pollId]) return res.status(404).json({ message: "Poll not found" })

  const id = Math.random().toString(36).substring(2, 8)

  if (!students[pollId]) students[pollId] = []
  students[pollId].push({ id, studentName })

  res.json({ studentId: id })
}
