import { startPupperteerService } from "services/start-puppeteer.service";

export class CrawlerPalmeirasController {
    
    constructor() {}
    
    public async init() {
        startPupperteerService.start('https://www.palmeiras.com.br/central-de-midia/noticias/');
    }
}