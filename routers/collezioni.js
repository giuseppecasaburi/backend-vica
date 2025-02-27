import express from 'express';
import collezioneController from '../controllers/collezioneController.js';

const router = express.Router();

// INDEX
router.get("/", collezioneController.index);
router.get("/navigate", collezioneController.showNavigate)

export default router;