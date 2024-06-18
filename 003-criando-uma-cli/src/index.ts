import inquirer from 'inquirer';

//questions
import { questions } from 'questions';
// interface
import { IAnswers } from 'interface/answers.interface';




class init {
    constructor() {
        inquirer.prompt(questions).then((answers: IAnswers) => {
            console.log(answers);
        });
    }
}

new init();