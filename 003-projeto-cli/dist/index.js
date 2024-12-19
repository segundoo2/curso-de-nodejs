#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
// Questions
const questions_1 = require("./questions");
// Controller
const generate_controller_1 = require("./controller/generate.controller");
class Init {
    constructor() {
        inquirer_1.default.prompt(questions_1.questions).then((answers) => {
            generate_controller_1.GenFile.gen(answers);
        });
    }
}
new Init();
//# sourceMappingURL=index.js.map