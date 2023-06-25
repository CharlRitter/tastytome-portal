import { test } from '@playwright/test';

const devSite = 'http://localhost:3000/library';

test.beforeEach(async ({ page }) => {
  // Launch the browser and navigate to the dev site
  await page.goto(devSite);
});

// test.describe('', () => {
//   const resultsFolder = '';

//   test('', async ({ page, isMobile }, testInfo) => {
//     // Take a screenshot for visual verification
//     await page.screenshot({
//       path: `test-results/${resultsFolder}/${testInfo.workerIndex}-${testInfo.project.name}-.png`
//     });
//   });
// });
