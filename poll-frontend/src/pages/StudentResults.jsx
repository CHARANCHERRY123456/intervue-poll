import { useSelector, useDispatch } from "react-redux"
import { toggleChat } from "../features/ui/uiSlice"
import ChatParticipantsPanel from "../components/ChatParticipantsPanel"

export default function StudentResults() {
  const dispatch = useDispatch()
  const results = useSelector(s=>s.poll.results)
  const q = useSelector(s=>s.poll.activeQuestion)
  const showChat = useSelector(s => s.ui.isChatOpen)

  const totalVotes = Object.values(results).reduce((sum, v) => sum + v, 0)

  return (
    <>
    <div className="min-h-screen flex items-start justify-center px-6 py-16 bg-gray-50">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Question 1</h2>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gray-700 text-white px-5 py-3 text-sm font-medium">{q?.question}</div>
          <div className="p-6 space-y-3">
            {q?.options?.map((opt, i) => {
              const voteCount = results[opt] || 0
              const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0

              return (
                <div
                  key={i}
                  className="relative rounded-lg overflow-hidden bg-gray-100"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                  <div className="relative flex items-center justify-between gap-3 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
                        percentage > 0 ? 'bg-white text-indigo-600' : 'bg-gray-300 text-gray-700'
                      }`}>
                        {i + 1}
                      </div>
                      <div className={`text-base font-medium ${
                        percentage > 0 ? 'text-white' : 'text-gray-800'
                      }`}>{opt}</div>
                    </div>
                    <div className={`text-sm font-semibold ${
                      percentage > 0 ? 'text-white' : 'text-gray-600'
                    }`}>{percentage}%</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-6 text-center text-gray-600 text-sm">
          Wait for the teacher to ask a new question..
        </div>
      </div>
    </div>

    <button onClick={()=>dispatch(toggleChat())} className="fixed bottom-6 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-colors" aria-pressed={showChat} aria-label="Toggle chat">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H8l-5 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"/>
      </svg>
    </button>

    {showChat && <ChatParticipantsPanel />}
    </>
  )
}
