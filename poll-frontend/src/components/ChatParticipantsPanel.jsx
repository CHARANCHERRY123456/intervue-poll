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
    <div className="fixed bottom-24 right-6 w-96 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("chat")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "chat"
              ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
          }`}
        >
          Chat
        </button>
        <button
          onClick={() => setActiveTab("participants")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "participants"
              ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
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
        <div className="h-96 overflow-y-auto p-4">
          <div className="space-y-2">
            {students.length === 0 ? (
              <div className="text-center text-gray-400 text-sm mt-8">No participants yet</div>
            ) : (
              students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-sm font-semibold text-indigo-600">
                        {student.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">{student.name}</span>
                  </div>
                  {isTeacher && (
                    <button
                      onClick={() => emitKickStudent({ pollId, studentId: student.id })}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
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
