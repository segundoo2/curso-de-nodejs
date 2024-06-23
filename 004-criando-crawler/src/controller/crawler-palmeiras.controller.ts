import puppeteer from "puppeteer";

export class CrawlerPalmeirasController {
    
    constructor() {}
    public async init() {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.goto( 'https://www.palmeiras.com.br/central-de-midia/noticias/' );

    }
}