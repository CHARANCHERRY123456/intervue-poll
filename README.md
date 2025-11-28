# Intervue — Live Polling System (Assignment)

**Quick overview**
- Live polling app with two personas: **Teacher** and **Student**.
- Built with React (frontend) and Express + Socket.IO (backend).
- Key features: real-time questions, student answers, live results, progress bars, chat, participants list, poll history.

**Features**
- Teacher
  - Create a new poll (server-generated pollId)
  - Ask questions with configurable time limit
  - View live results (real-time updates)
  - Automatically end a question when all students have answered
  - Kick participants (teacher only)
  - View poll history (server-stored)

- Student
  - Enter name (per tab) and join poll
  - Receive active question in real-time and submit answer
  - See live results after submission
  - Late-join support: new students joining during an active question receive the question, current timer and current results

- Common / UI
  - Chat panel with Chat / Participants tabs (top-right floating panel)
  - Pixel-aligned UI matching the provided Figma design (cards, dark header, progress bars, badges)
  - Toast notifications for new questions

**Project structure (important files)**
- `poll-backend/` — Express + Socket.IO server
  - `app.js`, `server.js`, `sockets/poll.socket.js`
  - `data/store.js` — in-memory polls and history store
  - `controllers/poll.controller.js` — REST endpoints (create poll, get poll, getPollHistory)
  - `routes/poll.routes.js`

- `poll-frontend/` — React + Vite app
  - `src/pages/` — page components (TeacherHome, TeacherLiveQuestion, TeacherResults, StudentQuestion, StudentResults, PollHistory, WaitingRoom)
  - `src/components/` — shared components (Logo, ChatParticipantsPanel, Toasts)
  - `src/hooks/useSockets.js` — socket event wiring
  - `src/features/` — Redux slices (poll, teacher, student, ui)

**Local setup (development)**
1. Clone the repo (already in this workspace)

2. Backend
- Open terminal and go to backend folder:

```bash
cd poll-backend
```

- Install dependencies (if not already):

```bash
npm install
```

- Start server (default dev command used in this project):

```bash
npm start
# or in dev with nodemon: npm run dev
```

- Backend default port used during development: `5000` (CORS configured for `http://localhost:5173`)

3. Frontend
- Open a separate terminal and go to frontend folder:

```bash
cd poll-frontend
```

- Install dependencies:

```bash
npm install
```

- Start dev server (Vite) — frontend default port: `5173`:

```bash
npm run dev
```

4. Workflow
- Create a poll as a Teacher (TeacherHome). Copy the poll id and open a Student tab.
- Students join using the poll id and enter their name.
- Teacher asks a question. Students see the question in real-time and submit answers.
- Results update in real-time for all participants. The question ends when timer expires OR all students have answered.
- Teacher can view poll history (saved server-side) via `View Poll History`.

**APIs used**
- `POST /api/poll` — create a new poll (returns pollId)
- `GET /api/poll/:pollId` — get poll metadata (includes history + current state)
- `GET /api/poll/:pollId/history` — get stored history for the poll
- Socket events (via Socket.IO): `teacher:ask_question`, `student:answer`, `question:new`, `timer:update`, `results:update`, `students:update`, `chat:new`, `teacher:kick`, etc.

**Notes on design & implementation decisions**
- In-memory store (`poll-backend/data/store.js`) is used for simplicity as required by the assignment; history is stored per-poll id in memory.
- Socket rooms are per-poll (`socket.join(pollId)`) so events are scoped.
- The backend clears previous question intervals before starting a new one to avoid timer merging issues.
- Late-join handling: server emits active question + remaining time + current results to the joining socket.
- Auto-end when all students have answered: server tracks answered student ids (per-poll) and stops the timer early once everyone answered.
- UI aims to match the Figma design closely (dark header, purple selected pill, progress bars showing percentages).

**Effort summary (what I did to complete the assignment)**
- Implemented core real-time polling flows (ask question, send timer, submit answers, broadcast results).
- Fixed timer concurrency and late-join issues by tracking intervals and poll state server-side.
- Built teacher flows (ask question, view live results, view history) and student flows (join, answer, see results).
- Added chat and participants panel (tabbed) as a bonus feature.
- Implemented poll history storage in backend and REST endpoint to fetch it.
- UI refined to match Figma with Tailwind CSS utility classes and dedicated components.

**Limitations & next steps**
- Current storage is in-memory: restarting the backend clears polls/history. For production, move to a persistent DB (e.g., PostgreSQL).
- Authentication is minimal (teacher flag is client-provided). For production, add proper auth and server-side teacher verification.
- Deployment: set correct production environment variables (CORS, ports) and host frontend + backend (Netlify/Vercel for frontend, Heroku/Render/Cloud VM for backend) and configure a reverse proxy or unified domain.

**Quick troubleshooting**
- If history fails to load: ensure backend is running on port `5000` and CORS allows `http://localhost:5173`.
- If timers are merging: ensure only one backend instance is running and previous intervals were cleared. The code guards against duplicate intervals.

---
If you want, I can also:
- Add a brief `README.md` inside `poll-frontend/` and `poll-backend/` with service-level commands.
- Create a `Procfile` / Dockerfile for easy deployment.
- Prepare a minimal test script to smoke-test the main flows.

