import { test, expect } from '@playwright/test';
import pages from '@/constants/pages';

const devSite = 'http://localhost:3000';

test.beforeEach(async ({ page }) => {
  // Launch the browser and navigate to the dev site
  await page.goto(devSite);
});

test.describe('Sidemenu Navigation', () => {
  const resultsFolder = 'sidemenu-navigation';

  pages.forEach((currentPage) => {
    const pageTitle = currentPage.title;
    const pageRoute = currentPage.route;

    test(`navigate to ${pageTitle} page`, async ({ page, isMobile }, testInfo) => {
      //  Open the side menu
      if (isMobile) {
        await page.getByRole('button', { name: 'open drawer' }).click();
      }
      // Click on the side menu item corresponding to the page and wait for navigation
      await page.getByRole('button', { name: pageTitle }).click();

      // Verify that the URL has changed to the expected value
      await expect(page).toHaveURL(`${devSite}${pageRoute}`);

      // Take a screenshot for visual verification
      await page.screenshot({
        path: `test-results/${resultsFolder}/${testInfo.workerIndex}-${testInfo.project.name}-${pageTitle}.png`
      });
    });
  });
});
