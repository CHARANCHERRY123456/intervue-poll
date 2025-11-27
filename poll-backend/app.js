import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { rateLimiter } from "./config/rateLimit.js"
import { corsOptions } from "./config/cors.js"
import notFound from "./middleware/notFound.js"
import errorHandler from "./middleware/errorHandler.js"
import router from "./routes/poll.routes.js"

const app = express()

app.use(cors(corsOptions))
app.use(helmet())
app.use(morgan("dev"))
app.use(rateLimiter)
app.use(express.json())

app.use("/api", router)

app.use(notFound)
app.use(errorHandler)

export default app;
