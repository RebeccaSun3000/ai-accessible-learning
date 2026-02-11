import OpenAI from 'openai';
import { TranscriptSegment } from './transcription.service';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class AnalysisService {
  private visualKeywords = [
    // 位置指示词
    '看这里', '看右边', '看左边', '看上面', '看下面',
    '右上角', '左上角', '右下角', '左下角',
    '上面', '下面', '左边', '右边', '旁边',

    // 操作指示词
    '点这个', '点击这个', '点击这里', '选择这个',
    '拖动', '滑动', '双击',

    // 视觉元素
    '这个图标', '这个按钮', '红色按钮', '蓝色的',
    '图片', '图标', '箭头', '勾选框',

    // 指代词
    '这个', '那个', '这里', '那里'
  ];

  async analyzeVisualDependency(segments: TranscriptSegment[]): Promise<TranscriptSegment[]> {
    const analyzedSegments: TranscriptSegment[] = [];

    for (const segment of segments) {
      // Step 1: Quick keyword check
      const hasKeywords = this.containsVisualKeywords(segment.text);

      // Step 2: Use GPT for context analysis if keywords found
      let isVisualDependent = hasKeywords;

      if (hasKeywords) {
        isVisualDependent = await this.analyzeWithGPT(segment.text);
      }

      analyzedSegments.push({
        ...segment,
        isVisualDependent
      });
    }

    return analyzedSegments;
  }

  private containsVisualKeywords(text: string): boolean {
    return this.visualKeywords.some(keyword => text.includes(keyword));
  }

  private async analyzeWithGPT(text: string): Promise<boolean> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: '你是一个视觉依赖分析专家。判断给定的文本是否依赖视觉信息才能理解。如果文本包含位置指示、颜色描述、手势操作等需要看屏幕才能理解的内容，返回"是"，否则返回"否"。只返回"是"或"否"。'
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.3,
        max_tokens: 10
      });

      const result = response.choices[0]?.message?.content?.trim() || '否';
      return result.includes('是');
    } catch (error) {
      console.error('GPT analysis error:', error);
      // Fallback to keyword-based detection
      return true;
    }
  }
}
