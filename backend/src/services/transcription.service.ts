import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface TranscriptSegment {
  timestamp: string;
  text: string;
  isVisualDependent?: boolean;
}

export class TranscriptionService {
  async transcribeVideo(videoFile: Buffer): Promise<TranscriptSegment[]> {
    // TODO: Implement Whisper transcription
    // 1. Convert video to audio if needed
    // 2. Call Whisper API
    // 3. Parse timestamps
    // 4. Return structured segments

    throw new Error('Not implemented yet');
  }
}
