import { Request, Response } from 'express';
import { ScraperService } from '../services/scraper.service';

const scraperService = new ScraperService();

export class ScraperController {
  async scrape(req: Request, res: Response) {
    try {
      const { url } = req.body;

      if (!url) {
        return res.status(400).json({ error: 'URL is required' });
      }

      const elements = await scraperService.scrapePageStructure(url);

      res.json({
        success: true,
        step: 'Step 3: Page Structure Scraping',
        url: url,
        elements: elements,
        totalElements: elements.length
      });
    } catch (error) {
      console.error('Scraping error:', error);
      res.status(500).json({ error: 'Scraping failed' });
    }
  }
}
