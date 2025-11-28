import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toggleChat } from "../features/ui/uiSlice"
import ChatParticipantsPanel from "../components/ChatParticipantsPanel"

export default function PollHistory() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const pollId = useSelector(s => s.poll.pollId)
  const showChat = useSelector(s => s.ui.isChatOpen)
  
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!pollId) return
    
    fetch(`http://localhost:3000/api/poll/${pollId}/history`)
      .then(res => res.json())
      .then(data => {
        setHistory(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch history:", err)
        setLoading(false)
      })
  }, [pollId])

  return (
    <>
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">View Poll History</h1>
          <button
            onClick={() => navigate("/teacher/results")}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ← Back to Results
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading history...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No poll history yet</p>
          </div>
        ) : (
          <div className="space-y-8">
            {history.map((item, idx) => {
              const totalVotes = Object.values(item.results).reduce((sum, v) => sum + v, 0)
              
              return (
                <div key={idx} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Question {idx + 1}</h2>
                  </div>
                  
                  <div className="bg-gray-700 text-white px-5 py-3 text-sm font-medium">
                    {item.question}
                  </div>
                  
                  <div className="p-6 space-y-3">
                    {item.options.map((opt, i) => {
                      const voteCount = item.results[opt] || 0
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
              )
            })}
          </div>
        )}
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
