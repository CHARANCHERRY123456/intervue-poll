import { z } from "zod"

export const createPollSchema = z.object({
  teacherName: z.string().min(1)
})
