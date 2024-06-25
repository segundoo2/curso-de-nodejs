import { startPupperteerService } from "services/start-puppeteer.service";

export class CrawlerCorinthiansController {
    constructor(){}

    public async init() {
        try {
            const page = startPupperteerService.start(
                'https://www.corinthians.com.br/noticias'
            );
            
        } catch (error) {
            console.log(error);
        }
    }
}