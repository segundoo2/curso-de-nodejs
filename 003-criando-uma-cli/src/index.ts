#!/usr/bin/env node
import inquirer from 'inquirer';

//questions
import { questions } from 'questions';
// interface
import { IAnswers } from 'interface/answers.interface';
//controller
import { GenFile } from 'controller/genaration.controller';




class init {
    constructor() {
        inquirer.prompt(questions).then((answers: IAnswers) => {
            GenFile.gen(answers);
        });
    }
}

new init();