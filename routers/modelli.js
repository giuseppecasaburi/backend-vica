import express from 'express'
import modelliController from '../controllers/modelliController.js'

const router = express.Router();

router.get("/", modelliController.index)
router.get("/:slug", modelliController.show)

export default router;