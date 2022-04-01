import { Handler } from "@netlify/functions";
import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";

export const handler: Handler = async (event, context) => {
  const { name = "stranger" } = event.queryStringParameters;

  const browser = await puppeteer.launch({
    executablePath: await chromium.executablePath,
    defaultViewport: {
      width: 1200,
      height: 675,
    },
    headless: true,
  });

  const page = await browser.newPage();

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
};
