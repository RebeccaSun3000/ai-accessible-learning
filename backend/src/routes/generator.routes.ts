import { Router } from 'express';
import { GeneratorController } from '../controllers/generator.controller';

const router = Router();
const controller = new GeneratorController();

router.post('/generate', (req, res) => controller.generate(req, res));

export default router;
