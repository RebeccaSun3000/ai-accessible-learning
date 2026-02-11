import { Request, Response } from 'express';
import { TranscriptionService } from '../services/transcription.service';

const transcriptionService = new TranscriptionService();

export class TranscriptionController {
  async transcribe(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No video file uploaded' });
      }

      const videoFile = req.file.buffer;
      const filename = req.file.originalname;

      const segments = await transcriptionService.transcribeVideo(videoFile, filename);

      res.json({
        success: true,
        step: 'Step 1: Video → Structured Text',
        segments: segments,
        totalSegments: segments.length
      });
    } catch (error) {
      console.error('Transcription error:', error);
      res.status(500).json({ error: 'Transcription failed' });
    }
  }
}
