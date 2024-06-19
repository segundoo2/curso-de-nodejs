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
        console.log(gitName, FoderName)
    }
}

export const GenFile = new GenerateController();