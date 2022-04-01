const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1200,
      height: 675,
    },
  });
  const page = await browser.newPage();

  await page.setContent(`
    <h1>${new Date().toLocaleTimeString()}</h1>
  `);
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "example.png" });

  await browser.close();
})();
