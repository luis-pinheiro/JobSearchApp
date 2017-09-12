const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('file:///C:/Users/profi/Documents/_webdev/JobSearchApp/index.html');
    // await page.
})();