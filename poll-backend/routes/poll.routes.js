import { Router } from "express"
import { validate } from "../middleware/validate.js"
import { createPollSchema } from "../validators/poll.validator.js"
import { createStudentSchema } from "../validators/student.validator.js"
import { createPoll, getPoll, getPollHistory } from "../controllers/poll.controller.js"
import { createStudent } from "../controllers/student.controller.js"

const router = Router()

router.post("/poll", validate(createPollSchema), createPoll)

router.get("/poll/:pollId", getPoll)

router.get("/poll/:pollId/history", getPollHistory)

router.post("/student", validate(createStudentSchema), createStudent)

export default router;