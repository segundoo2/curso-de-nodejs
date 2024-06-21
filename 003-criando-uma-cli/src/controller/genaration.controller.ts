//shelljs
import path from 'node:path';
import shellJs from 'shelljs';
import fs from 'node:fs';
//interface
import { EChoicesBoilerPlate } from "enum/choices-boilerplate.enum";
//enum
import { EGitName } from "enum/gitname.enum";
import { IAnswers } from "interface/answers.interface";


class GenerateController {
    public gen(answers: IAnswers) {
        try {
            switch (answers.tech) {
                case EChoicesBoilerPlate.NODE_TS:
                    this._execPath(EGitName.NODEJS_TS, answers.FolderName)
                    break;

                case EChoicesBoilerPlate.SCSS:
                    this._execPath(EGitName.SCSS, answers.FolderName)
                    break;
            }
        } catch (error) {
            console.log(error)
        }
    }

    private _execPath(gitName:string, FoderName:string) {
        try {
            shellJs.cd(path.resolve());
            shellJs.exec(`git clone git@github.com:troquatte/${gitName}.git`);

            fs.renameSync(
                `${path.join(path.resolve(), gitName)}`,
                `${path.join(path.resolve(), FoderName)}`,
            )
            
            console.log('Arquivo criado com sucesso!');
            shellJs.exit(); 
        } catch (error) {
            console.log(error)
        }
}
}

export const GenFile = new GenerateController();