import puppeteer from "puppeteer";

class StartPupperteerService {
    constructor() {}

    public async start(url: string) {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.goto(url);

        if(!page) return 'Configuração não responde!'

        return page;
    }
}

export const startPupperteerService = new StartPupperteerService();