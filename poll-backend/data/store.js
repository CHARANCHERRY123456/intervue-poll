export const polls = {}
export const students = {}

export function ensurePoll(pollId) {
  if (!polls[pollId]) polls[pollId] = { history: [], activeQuestion: null, currentResults: {}, interval: null }
  return polls[pollId]
}
