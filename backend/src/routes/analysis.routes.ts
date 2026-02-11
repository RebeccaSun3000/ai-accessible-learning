import { Router } from 'express';
import { AnalysisController } from '../controllers/analysis.controller';

const router = Router();
const controller = new AnalysisController();

router.post('/analyze', (req, res) => controller.analyze(req, res));

export default router;
