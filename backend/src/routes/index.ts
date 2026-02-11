import { Router } from 'express';
import transcriptionRoutes from './transcription.routes';
import analysisRoutes from './analysis.routes';
import scraperRoutes from './scraper.routes';
import generatorRoutes from './generator.routes';

const router = Router();

// Step 1: Video → Structured Text
router.use('/api', transcriptionRoutes);

// Step 2: Visual Dependency Analysis
router.use('/api', analysisRoutes);

// Step 3: Page Structure Scraping
router.use('/api', scraperRoutes);

// Step 4: Accessible Script Generation
router.use('/api', generatorRoutes);

export default router;
