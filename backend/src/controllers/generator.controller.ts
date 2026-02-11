import { Request, Response } from 'express';
import { GeneratorService } from '../services/generator.service';

const generatorService = new GeneratorService();

export class GeneratorController {
  async generate(req: Request, res: Response) {
    try {
      const { segments, pageElements } = req.body;

      if (!segments || !Array.isArray(segments)) {
        return res.status(400).json({ error: 'Invalid segments data' });
      }

      if (!pageElements || !Array.isArray(pageElements)) {
        return res.status(400).json({ error: 'Invalid page elements data' });
      }

      const script = await generatorService.generateAccessibleScript(segments, pageElements);

      res.json({
        success: true,
        step: 'Step 4: Accessible Script Generation',
        script: script,
        totalSteps: script.length
      });
    } catch (error) {
      console.error('Generation error:', error);
      res.status(500).json({ error: 'Script generation failed' });
    }
  }
}
