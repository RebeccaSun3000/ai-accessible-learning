import { Router } from 'express';
import { TranscriptionController } from '../controllers/transcription.controller';

const router = Router();
const controller = new TranscriptionController();

router.post('/transcribe', (req, res) => controller.transcribe(req, res));

export default router;
