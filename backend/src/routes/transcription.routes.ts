import { Router } from 'express';
import multer from 'multer';
import { TranscriptionController } from '../controllers/transcription.controller';

const router = Router();
const controller = new TranscriptionController();

// Configure multer for file upload (store in memory)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024 // 25MB limit (Whisper API limit)
  }
});

router.post('/transcribe', upload.single('video'), (req, res) => controller.transcribe(req, res));

export default router;
