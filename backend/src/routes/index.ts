import { Router } from 'express';
import transcriptionRoutes from './transcription.routes';

const router = Router();

// Step 1: Video → Structured Text
router.use('/api', transcriptionRoutes);

// TODO: Add more routes
// Step 2: Visual Dependency Analysis
// Step 3: Page Structure Scraping
// Step 4: Accessible Script Generation

export default router;
