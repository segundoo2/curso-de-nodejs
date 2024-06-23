import { CrawlerPalmeirasController } from "controller/crawler-palmeiras.controller"

class Init {
  constructor() {
    this._init();
  }

  private _init() {
    new CrawlerPalmeirasController.init();
    console.log("Inicializado com sucesso");
    
  }
}

new Init();
