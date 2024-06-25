/* eslint-disable no-async-promise-executor */
import puppeteer, { Page } from "puppeteer";

class StartPupperteerService {
    constructor() { }

    public start(url: string): Promise<Page> {

        return new Promise(async (resolve, reject) => {
            const browser = await puppeteer.launch({ headless: false });
            const page = await browser.newPage();
            const allPages = await browser.pages();
            allPages[0].close();

            await page.goto(url);

            if (!page) return reject('Configuração não responde!');

            return resolve(page);
        })
    }
}
    export const startPupperteerService = new StartPupperteerService();