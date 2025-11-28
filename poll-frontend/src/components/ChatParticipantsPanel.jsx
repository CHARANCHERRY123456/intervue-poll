import { useSelector } from "react-redux"
import { useState } from "react"
import { emitSendChat, emitKickStudent } from "../utils/socketActions"

export default function ChatParticipantsPanel() {
  const [activeTab, setActiveTab] = useState("chat")
  
  const messages = useSelector(s=>s.ui.messages)
  const students = useSelector(s=>s.poll.students)
  const pollId = useSelector(s=>s.poll.pollId)
  const studentName = useSelector(s=>s.student.studentName)
  const isTeacher = useSelector(s=>s.teacher.isTeacher)

  const [text, setText] = useState("")

  const send = () => {
    if(!text.trim()) return
    emitSendChat({ pollId, user: isTeacher ? "Teacher" : studentName, message: text })
    setText("")
  }

  const formatTime = (time) => {
    if (!time) return ""
    const date = new Date(time)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="fixed bottom-24 right-6 w-96 bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-100">
      {/* Tabs */}
      <div className="flex bg-gray-50 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("chat")}
          className={`flex-1 px-6 py-3 text-sm font-semibold transition-all ${
            activeTab === "chat"
              ? "text-gray-900 bg-white border-b-2 border-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Chat
        </button>
        <button
          onClick={() => setActiveTab("participants")}
          className={`flex-1 px-6 py-3 text-sm font-semibold transition-all ${
            activeTab === "participants"
              ? "text-gray-900 bg-white border-b-2 border-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Participants
        </button>
      </div>

      {/* Chat Content */}
      {activeTab === "chat" && (
        <div className="flex flex-col h-96">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 text-sm mt-8">No messages yet</div>
            ) : (
              messages.map((m, i) => {
                const isMine = m.user === (isTeacher ? "Teacher" : studentName)
                return (
                  <div key={i} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} max-w-[78%]`}> 
                      <div className={`text-xs font-semibold ${isMine ? 'text-indigo-600' : 'text-gray-600'}`}>{m.user}</div>
                      <div className={`mt-1 px-4 py-2 rounded-lg text-sm ${isMine ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-gray-800 text-white'}`}>
                        {m.message}
                      </div>
                      {m.time && (
                        <div className={`text-xs text-gray-400 mt-1 ${isMine ? 'text-right' : ''}`}>{formatTime(m.time)}</div>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
          
          {/* Chat Input */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type a message..."
              />
              <button
                onClick={send}
                disabled={!text.trim()}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  text.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Participants Content */}
      {activeTab === "participants" && (
        <div className="h-96 overflow-y-auto bg-white">
          {/* Header Row */}
          <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b border-gray-200">
            <span className="text-xs font-semibold text-gray-500 uppercase">Name</span>
            <span className="text-xs font-semibold text-gray-500 uppercase">Action</span>
          </div>
          
          {/* Participants List */}
          <div>
            {students.length === 0 ? (
              <div className="text-center text-gray-400 text-sm py-12">No participants yet</div>
            ) : (
              students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between px-6 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900">{student.name}</span>
                  {isTeacher && (
                    <button
                      onClick={() => emitKickStudent({ pollId, studentId: student.id })}
                      className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                    >
                      Kick out
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
