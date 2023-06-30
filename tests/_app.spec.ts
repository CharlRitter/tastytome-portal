import { test, expect } from '@playwright/test';
import { PAGES, INFO_MODALS } from '@/constants/navigationitems';

const devSite = 'http://localhost:3000';

test.beforeEach(async ({ page }) => {
  // Launch the browser and navigate to the dev site
  await page.goto(devSite);
});

test.describe('Sidemenu Navigation', () => {
  const resultsFolder = 'sidemenu-navigation';

  PAGES.forEach((currentPage) => {
    const pageTitle = currentPage.title;
    const pageRoute = currentPage.route;

    test(`navigate to ${pageTitle} page`, async ({ page, isMobile }, testInfo) => {
      //  Open the side menu
      if (isMobile) {
        await page.getByRole('button', { name: 'open drawer' }).click();
      }

      // Click on the side menu item corresponding to the page and wait for navigation
      await page.getByRole('button', { name: pageTitle }).click();

      // Take a screenshot for visual verification
      await page.screenshot({
        path: `test-results/${resultsFolder}/${testInfo.workerIndex}-${testInfo.project.name}-${pageTitle}.png`
      });

      // Verify that the URL has changed to the expected value
      await expect(page).toHaveURL(`${devSite}${pageRoute}`);
    });
  });

  INFO_MODALS.modals.forEach((modal) => {
    const modalTitle = modal.title;

    test(`open, read and close ${modalTitle} modal`, async ({ page, isMobile }, testInfo) => {
      //  Open the side menu
      if (isMobile) {
        await page.getByRole('button', { name: 'open drawer' }).click();
      }

      // Click on the side menu item corresponding to the modal
      await page.getByRole('button', { name: modalTitle }).click();

      // Take a screenshot for visual verification
      await page.screenshot({
        path: `test-results/${resultsFolder}/${testInfo.workerIndex}-${testInfo.project.name}-${modalTitle}.png`
      });

      // Verify that the modal opened
      await page.waitForSelector(`[aria-labelledby=${modalTitle}-dialog-title]`, { state: 'visible' });

      // Close the modal
      await page.getByRole('button', { name: 'Close' }).click();

      // Verify that the modal closed
      await page.waitForSelector(`[aria-labelledby=${modalTitle}-dialog-title]`, { state: 'hidden' });
    });
  });
});
