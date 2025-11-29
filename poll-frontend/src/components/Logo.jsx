export default function Logo() {
  return (
    <div
      className="inline-flex items-center gap-4 px-5 py-2 rounded-full text-white font-semibold shadow-lg"
      style={{
        background: "linear-gradient(90deg,#7b6af6 0%,#5b26d0 100%)",
      }}
    >
      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3.5c-.4 0-.8.2-1 .6l-1.5 3.2-3.5.5c-.4.1-.7.4-.8.8-.1.4 0 .9.3 1.2l2.6 2.6-.6 3.6c-.1.4.1.8.5 1 .2.1.4.1.6.1.3 0 .6-.1.8-.3l3.1-1.6 3.1 1.6c.2.1.5.3.8.3.2 0 .4 0 .6-.1.4-.2.6-.6.5-1l-.6-3.6 2.6-2.6c.3-.3.4-.8.3-1.2-.1-.4-.4-.7-.8-.8l-3.5-.5L13 4.1c-.2-.4-.6-.6-1-.6z" fill="white"/>
          <path d="M6.5 5.5c.3.1.6.4.7.7.1.3 0 .6-.2.8-.3.3-.5.7-.7 1-.1.2-.4.3-.6.2-.3-.1-.5-.4-.6-.7-.1-.3 0-.6.2-.8.3-.3.5-.7.6-1 .1-.3.4-.4.6-.2z" fill="white" opacity="0.9"/>
        </svg>
      </span>

      <span className="text-lg leading-none">Intervue Poll</span>
    </div>
  )
}
