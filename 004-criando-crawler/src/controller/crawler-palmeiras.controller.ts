import { startPupperteerService } from "services/start-puppeteer.service";

export class CrawlerPalmeirasController {
    constructor() {}
    
    public async init() {
        try {
           const page = await startPupperteerService.start(
            'https://www.palmeiras.com.br/central-de-midia/noticias/');

            const selector = '.central-de-midia-container  .items-central';
            await page.waitForSelector(selector);

            const nodes = await page.$$(selector);

            console.log(nodes);

        } catch (error) {
            console.log(error);
        }
    }
}