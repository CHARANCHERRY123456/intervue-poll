import { Router } from "express"

const router = Router()

router.get("/sample", (req, res) => {
  res.json({ ok: true })
})

export default router
