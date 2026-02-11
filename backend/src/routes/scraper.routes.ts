import { Router } from 'express';
import { ScraperController } from '../controllers/scraper.controller';

const router = Router();
const controller = new ScraperController();

router.post('/scrape', (req, res) => controller.scrape(req, res));

export default router;
