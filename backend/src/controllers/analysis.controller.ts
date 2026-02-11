import { Request, Response } from 'express';
import { AnalysisService } from '../services/analysis.service';
import { TranscriptSegment } from '../services/transcription.service';

const analysisService = new AnalysisService();

export class AnalysisController {
  async analyze(req: Request, res: Response) {
    try {
      const { segments } = req.body;

      if (!segments || !Array.isArray(segments)) {
        return res.status(400).json({ error: 'Invalid segments data' });
      }

      const analyzedSegments = await analysisService.analyzeVisualDependency(segments);

      res.json({
        success: true,
        step: 'Step 2: Visual Dependency Analysis',
        segments: analyzedSegments,
        visualDependentCount: analyzedSegments.filter(s => s.isVisualDependent).length
      });
    } catch (error) {
      console.error('Analysis error:', error);
      res.status(500).json({ error: 'Analysis failed' });
    }
  }
}
