import { useSelector, useDispatch } from "react-redux"
import { clearActiveQuestion } from "../features/poll/pollSlice"
import { toggleChat } from "../features/ui/uiSlice"
import { socket } from "../app/socket"
import { useNavigate } from "react-router-dom"
import ChatParticipantsPanel from "../components/ChatParticipantsPanel"

export default function TeacherResults() {
  const pollId = useSelector(s => s.poll.pollId)
  const question = useSelector(s => s.poll.activeQuestion)
  const results = useSelector(s => s.poll.results)
  const showChat = useSelector(s => s.ui.isChatOpen)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const askNew = () => {
    socket.emit("teacher:new_question", pollId)
    dispatch(clearActiveQuestion())
    navigate("/teacher")
  }

  const viewHistory = () => {
    navigate("/teacher/history")
  }

  const totalVotes = question?.options?.reduce((sum, opt) => sum + (results[opt] || 0), 0) || 0

  return (
    <>
    <div className="min-h-screen flex items-start justify-center px-6 py-16 bg-gray-50">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Question</h2>
          <button
            onClick={viewHistory}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            View Poll History
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gray-700 text-white px-5 py-3 text-sm font-medium">{question?.question}</div>
          <div className="p-6 space-y-3">
            {question?.options?.map((opt, i) => {
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

        <button
          onClick={askNew}
          className="mt-6 w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all"
        >
          + Ask a new question
        </button>
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
