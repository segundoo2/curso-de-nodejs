import { startPupperteerService } from "services/start-puppeteer.service";

export class CrawlerCorinthiansController {
    constructor(){}

    public async init() {
        try {
            const page = await startPupperteerService.start(
            'https://www.corinthians.com.br/noticias'
        );

            const selector = '.ct-news-list  .ct-news-list-item';
            await page.waitForSelector(selector);

            const nodes = await page.$$(selector);
            const payload: Array<{link: string, titulo: string, data:string}> = []
            for (const node of nodes) {
                //link, titulo, data
                
                //link
                const link = await page.evaluate((el: Element) => {
                    return el.querySelector('.ct-news-list-item-content a')?.getAttribute('href');
                }, node);
                //titulo
                const titulo = await page.evaluate((el: Element) => {
                    return el.querySelector('.ct-news-list-item-content a h4')?.innerHTML.replace(/\n/g, '').replace(/<p>.*?<\/p>/g, '').trim();
                }, node);
                // data
                const data = await page.evaluate((el: Element) => {
                    return el.querySelector('.ct-news-list-item-content a p')?.innerHTML.replace(/\n/g, '').replace(/<strong>.*?<\/strong>/g, '').replace(/\-/g, '').trim();
                }, node)
                payload.push({
                    link,
                    titulo,
                    data
                })
            }

            console.log(payload);
            page.close();
        } catch (error) {
            console.log(error);
        }
    }
}