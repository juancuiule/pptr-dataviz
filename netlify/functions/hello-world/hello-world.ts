import { Handler } from "@netlify/functions";
const chromium = require("chrome-aws-lambda");

export const handler: Handler = async (event, context) => {
  const { name = "stranger" } = event.queryStringParameters;

  try {
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    let page = await browser.newPage();

    await page.setContent(`
    <h1>Hola ${name} hoy es ${new Date().toLocaleTimeString()}</h1>
  `);

    const buffer = await page.screenshot();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "image/png",
      },
      body: buffer.toString("base64"),
      isBase64Encoded: true,
    };
  } catch (error) {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
        body: JSON.stringify({
          error: error.message,
        }),
      },
    };
  }
};
