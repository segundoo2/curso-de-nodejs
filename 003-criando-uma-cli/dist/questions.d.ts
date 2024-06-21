import { EChoicesBoilerPlate } from "enum/choices-boilerplate.enum";
import { EErros } from "enum/erros.enum";
export declare const questions: ({
    type: string;
    name: string;
    message: string;
    choices: EChoicesBoilerPlate[];
    validate?: undefined;
} | {
    type: string;
    name: string;
    message: string;
    validate(FolderName: string): true | EErros;
    choices?: undefined;
})[];
