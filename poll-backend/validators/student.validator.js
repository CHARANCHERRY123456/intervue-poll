import { z } from "zod"

export const createStudentSchema = z.object({
  pollId: z.string().min(1),
  studentName: z.string().min(1)
})
