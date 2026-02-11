import { Request, Response } from 'express';
import { TranscriptionService } from '../services/transcription.service';

const transcriptionService = new TranscriptionService();

export class TranscriptionController {
  async transcribe(req: Request, res: Response) {
    try {
      // TODO: Handle file upload
      // const videoFile = req.file;

      res.status(501).json({
        message: 'Transcription endpoint - coming soon',
        step: 'Step 1: Video → Structured Text'
      });
    } catch (error) {
      res.status(500).json({ error: 'Transcription failed' });
    }
  }
}
