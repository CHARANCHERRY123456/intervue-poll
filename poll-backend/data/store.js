export const polls = {}
export const students = {}

export function ensurePoll(pollId) {
  if (!polls[pollId]) {
    polls[pollId] = { 
      history: [], 
      activeQuestion: null, 
      currentResults: {}, 
      interval: null,
      remaining: null
    }
  }
  return polls[pollId]
}

export function addQuestionToHistory(pollId, question, options, results) {
  ensurePoll(pollId)
  polls[pollId].history.push({
    question,
    options,
    results: { ...results },
    endedAt: Date.now()
  })
  return polls[pollId].history
}

export function getHistory(pollId) {
  ensurePoll(pollId)
  return polls[pollId].history || []
}
