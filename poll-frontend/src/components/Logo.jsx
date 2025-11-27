export default function Logo() {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 text-white font-medium text-sm">
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 16 16" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
      >
        <path 
          d="M8 2L2 6V14H6V10H10V14H14V6L8 2Z" 
          fill="currentColor"
        />
      </svg>
      Intervue Poll
    </div>
  )
}
