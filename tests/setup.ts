import { chromium, firefox, webkit, BrowserContextOptions } from '@playwright/test';
import projects from '../playwright.config';

/**
 * Get the browser instance based on the browser name.
 * @param {string} browserName The name of the browser (e.g., 'chromium', 'firefox', 'webkit')
 * @returns {Promise<Browser>} The browser instance
 */
async function getBrowser(browserName: string) {
  let browser = null;

  switch (browserName) {
    case 'chromium':
      browser = await chromium.launch();
      break;
    case 'firefox':
      browser = await firefox.launch();
      break;
    case 'webkit':
      browser = await webkit.launch();
      break;
    default:
      throw new Error(`Unsupported browser: ${browserName}`);
  }

  return browser;
}

type ProjectConfig = {
  name: string;
  use: BrowserContextOptions;
};

const defaultContextOptions = {
  // Set the viewport size
  viewport: {
    width: 1920,
    height: 1080,
  },
  // Enable or disable JavaScript execution in the context
  javaScriptEnabled: true,
};

// Jest/Jasmine setup
beforeAll(async () => {
  // Launch the browsers specified in the Playwright configuration
  // eslint-disable-next-line no-extra-parens
  (projects as ProjectConfig[]).forEach(async (project) => {
    const browserName = project.name.toLowerCase();
    const browserOptions = { ...defaultContextOptions, ...project.use };
    const browser = await getBrowser(browserName);
    const context = await browser.newContext(browserOptions);

    global.__PLAYWRIGHT__[browserName] = { browser: browser, context: context };
  });
});

afterAll(async () => {
  // Close all browser contexts
  Object.values(global.__PLAYWRIGHT__).forEach(async (browser: any) => {
    await browser.context.close();
    await browser.browser.close();
  });
});
