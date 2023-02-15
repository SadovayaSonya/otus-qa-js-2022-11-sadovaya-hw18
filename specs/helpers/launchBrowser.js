import {chromium} from "playwright";
import config from "../helpers/playwright.config.js";

async function launchBrowser() {
    const browser = await chromium.launch(config.use);
    const context = await browser.newContext(config.use);
    const page = await context.newPage();
    return [browser, page];
}

export default launchBrowser;