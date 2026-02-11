import { chromium } from 'playwright';

export interface PageElement {
  name: string;
  role: string;
  location: string;
  ariaLabel?: string;
}

export class ScraperService {
  async scrapePageStructure(url: string): Promise<PageElement[]> {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.goto(url, { waitUntil: 'networkidle' });

      // Extract accessibility tree
      const snapshot = await page.accessibility.snapshot();

      await browser.close();

      if (!snapshot) {
        return [];
      }

      return this.parseAccessibilityTree(snapshot);
    } catch (error) {
      await browser.close();
      throw error;
    }
  }

  private parseAccessibilityTree(snapshot: any, path: string = ''): PageElement[] {
    const elements: PageElement[] = [];
    const interactiveRoles = ['button', 'link', 'textbox', 'checkbox', 'radio', 'combobox', 'menuitem', 'tab'];

    const traverse = (node: any, currentPath: string, depth: number = 0) => {
      if (!node) return;

      // Extract element if it's interactive or has a meaningful name
      if (node.role && (interactiveRoles.includes(node.role) || node.name)) {
        const element: PageElement = {
          name: node.name || 'Unnamed',
          role: node.role,
          location: currentPath || 'root',
          ariaLabel: node.name
        };

        elements.push(element);
      }

      // Recursively traverse children
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach((child: any, index: number) => {
          const childPath = currentPath ? `${currentPath} > ${node.role || 'element'} ${index + 1}` : `${node.role || 'root'}`;
          traverse(child, childPath, depth + 1);
        });
      }
    };

    traverse(snapshot, path);
    return elements;
  }
}
