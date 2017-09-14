const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
    	headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://www.itjobs.pt/');
    await page.click('input#typehead');
    await page.type('lol');
    // await page.
})();