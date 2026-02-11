import OpenAI from 'openai';
import { TranscriptSegment } from './transcription.service';
import { PageElement } from './scraper.service';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface AccessibleScript {
  step: number;
  instruction: string;
  keyboardAction?: string;
  expectedFeedback?: string;
}

export class GeneratorService {
  async generateAccessibleScript(
    segments: TranscriptSegment[],
    pageElements: PageElement[]
  ): Promise<AccessibleScript[]> {
    // Filter visual-dependent segments
    const visualSegments = segments.filter(s => s.isVisualDependent);

    if (visualSegments.length === 0) {
      return [];
    }

    // Generate script using GPT (vibe coding)
    const script = await this.generateWithGPT(visualSegments, pageElements);

    return script;
  }

  private async generateWithGPT(
    segments: TranscriptSegment[],
    pageElements: PageElement[]
  ): Promise<AccessibleScript[]> {
    try {
      const prompt = this.buildPrompt(segments, pageElements);

      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: '你是一个无障碍脚本生成专家。根据视频讲稿和页面结构，生成盲人用户可以使用的键盘导航指令。每个步骤应该包含：1) 键盘操作（如"按Tab键3次"）2) 预期的屏幕阅读器反馈（如"读到Create Image按钮"）3) 操作说明。以JSON数组格式返回。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' }
      });

      const result = response.choices[0]?.message?.content;
      if (!result) {
        return [];
      }

      const parsed = JSON.parse(result);
      return this.formatScript(parsed);
    } catch (error) {
      console.error('GPT generation error:', error);
      return [];
    }
  }

  private buildPrompt(segments: TranscriptSegment[], pageElements: PageElement[]): string {
    const segmentsText = segments.map(s => `[${s.timestamp}] ${s.text}`).join('\n');
    const elementsText = pageElements.map(e => `- ${e.role}: "${e.name}" (位置: ${e.location})`).join('\n');

    return `
视频讲稿中的视觉依赖片段：
${segmentsText}

页面可访问元素：
${elementsText}

请根据上述信息，生成盲人用户可以使用的键盘导航脚本。返回JSON格式：
{
  "steps": [
    {
      "step": 1,
      "instruction": "操作说明",
      "keyboardAction": "键盘操作",
      "expectedFeedback": "预期的屏幕阅读器反馈"
    }
  ]
}
`;
  }

  private formatScript(parsed: any): AccessibleScript[] {
    if (!parsed.steps || !Array.isArray(parsed.steps)) {
      return [];
    }

    return parsed.steps.map((step: any) => ({
      step: step.step || 0,
      instruction: step.instruction || '',
      keyboardAction: step.keyboardAction,
      expectedFeedback: step.expectedFeedback
    }));
  }
}
