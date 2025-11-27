import Logo from "../components/Logo"

export default function WaitingRoom() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-3xl text-center">
        <div className="mb-6">
          <Logo />
        </div>

        <div className="flex flex-col items-center gap-6 mt-8">
          <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-purple-600 animate-spin"></div>

          <h2 className="text-2xl font-semibold text-gray-900">Wait for the teacher to ask questions..</h2>
        </div>
      </div>

      <button
        aria-label="Open chat"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-indigo-500 shadow-lg flex items-center justify-center text-white"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15a2 2 0 01-2 2H8l-5 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}
