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
  async transcribeVideo(videoFile: Buffer, filename: string): Promise<TranscriptSegment[]> {
    try {
      // Create a Blob from Buffer (Node.js 18+ compatible)
      const blob = new Blob([videoFile]);

      // Create a File-like object with name property
      const file = Object.assign(blob, { name: filename });

      // Call Whisper API with timestamp_granularities for segment-level timestamps
      const transcription = await openai.audio.transcriptions.create({
        file: file as any,
        model: 'whisper-1',
        response_format: 'verbose_json',
        timestamp_granularities: ['segment']
      });

      // Parse the response and create segments
      const segments: TranscriptSegment[] = [];

      if (transcription.segments) {
        for (const segment of transcription.segments) {
          segments.push({
            timestamp: this.formatTimestamp(segment.start),
            text: segment.text.trim(),
            isVisualDependent: false // Will be analyzed in Step 2
          });
        }
      }

      return segments;
    } catch (error) {
      console.error('Transcription error:', error);
      throw new Error('Failed to transcribe video');
    }
  }

  private formatTimestamp(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
}
