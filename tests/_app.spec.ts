import { test, expect } from '@playwright/test';
import { INFO_MODALS } from '@/constants/navigationItems';

const devSite = 'http://localhost:3000';

test.beforeEach(async ({ page }) => {
  // Launch the browser and navigate to the dev site
  await page.goto(`${devSite}/recipes`);
});

test.describe('Sidemenu Navigation', () => {
  const resultsFolder = 'sidemenu-navigation';

  test('navigate to recipes page', async ({ page, isMobile }, testInfo) => {
    //  Open the side menu
    if (isMobile) {
      await page.getByRole('button', { name: 'open drawer' }).click();
    }

    // Click on the side menu item corresponding to the page and wait for navigation
    await page.getByRole('button', { name: 'Recipes' }).click();

    // Take a screenshot for visual verification
    await page.screenshot({
      path: `test-results/${resultsFolder}/${testInfo.workerIndex}-${testInfo.project.name}-recipes.png`
    });

    // Verify that the URL has changed to the expected value
    await expect(page).toHaveURL(`${devSite}/recipes`);
  });

  test('navigate to pantry page', async ({ page, isMobile }, testInfo) => {
    //  Open the side menu
    if (isMobile) {
      await page.getByRole('button', { name: 'open drawer' }).click();
    }

    // Click on the side menu item corresponding to the page and wait for navigation
    await page.getByRole('button', { name: 'Pantry' }).click();

    // Take a screenshot for visual verification
    await page.screenshot({
      path: `test-results/${resultsFolder}/${testInfo.workerIndex}-${testInfo.project.name}-pantry.png`
    });

    // Verify that the URL has changed to the expected value
    await expect(page).toHaveURL(`${devSite}/pantry`);
  });

  test('navigate to shopping list page', async ({ page, isMobile }, testInfo) => {
    //  Open the side menu
    if (isMobile) {
      await page.getByRole('button', { name: 'open drawer' }).click();
    }

    // Click on the side menu item corresponding to the page and wait for navigation
    await page.getByRole('button', { name: 'Shopping List' }).click();

    // Take a screenshot for visual verification
    await page.screenshot({
      path: `test-results/${resultsFolder}/${testInfo.workerIndex}-${testInfo.project.name}-shopping-list.png`
    });

    // Verify that the URL has changed to the expected value
    await expect(page).toHaveURL(`${devSite}/shopping-list`);
  });

  test('navigate to account page', async ({ page, isMobile }, testInfo) => {
    //  Open the side menu
    if (isMobile) {
      await page.getByRole('button', { name: 'open drawer' }).click();
    }

    // Click on the side menu item corresponding to the page and wait for navigation
    await page.getByRole('button', { name: 'Account' }).click();

    // Take a screenshot for visual verification
    await page.screenshot({
      path: `test-results/${resultsFolder}/${testInfo.workerIndex}-${testInfo.project.name}-account.png`
    });

    // Verify that the URL has changed to the expected value
    await expect(page).toHaveURL(`${devSite}/account`);
  });

  test('navigate to settings page', async ({ page, isMobile }, testInfo) => {
    //  Open the side menu
    if (isMobile) {
      await page.getByRole('button', { name: 'open drawer' }).click();
    }

    // Click on the side menu item corresponding to the page and wait for navigation
    await page.getByRole('button', { name: 'Settings' }).click();

    // Take a screenshot for visual verification
    await page.screenshot({
      path: `test-results/${resultsFolder}/${testInfo.workerIndex}-${testInfo.project.name}-settings.png`
    });

    // Verify that the URL has changed to the expected value
    await expect(page).toHaveURL(`${devSite}/settings`);
  });

  test('navigate to contact page', async ({ page, isMobile }, testInfo) => {
    //  Open the side menu
    if (isMobile) {
      await page.getByRole('button', { name: 'open drawer' }).click();
    }

    // Click on the side menu item corresponding to the page and wait for navigation
    await page.getByRole('button', { name: 'Contact' }).click();

    // Take a screenshot for visual verification
    await page.screenshot({
      path: `test-results/${resultsFolder}/${testInfo.workerIndex}-${testInfo.project.name}-contact.png`
    });

    // Verify that the URL has changed to the expected value
    await expect(page).toHaveURL(`${devSite}/contact`);
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
