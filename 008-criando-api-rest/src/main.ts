import express from "express";

class Main {
    private _server;

    constructor() {
        this._server = express();
    }

    get server() {
        return this._server;
    }
}

export const main = new Main();