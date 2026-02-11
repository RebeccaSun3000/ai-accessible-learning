import OpenAI from 'openai';
import { TranscriptSegment } from './transcription.service';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class AnalysisService {
  private visualKeywords = [
    '看这里', '点这个', '这个图标', '红色按钮', '上面那个',
    '右上角', '左边', '下方', '点击', '选择这个'
  ];

  async analyzeVisualDependency(segments: TranscriptSegment[]): Promise<TranscriptSegment[]> {
    // TODO: Use LLM to identify visual dependencies
    // 1. Check for visual keywords
    // 2. Use GPT to analyze context
    // 3. Mark segments with VISUAL_DEPENDENCY flag

    return segments.map(segment => ({
      ...segment,
      isVisualDependent: this.containsVisualKeywords(segment.text)
    }));
  }

  private containsVisualKeywords(text: string): boolean {
    return this.visualKeywords.some(keyword => text.includes(keyword));
  }
}
