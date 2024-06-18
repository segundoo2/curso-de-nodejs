import { EChoicesBoilerPlate } from "enum/choices-boilerplate.enum";
import path from "path";
import fs from "node:fs";
import { EErros } from "enum/erros.enum";
import { EGitName } from "enum/gitname.enum";

export const questions = [
    {
        type: 'list',
        name: 'tech',
        message: 'Qual boilerplate devo criar?',
        choices: [EChoicesBoilerPlate.NODE_TS, EChoicesBoilerPlate.SCSS],
    },

    {
        type: 'input',
        name: 'FolderName',
        message: 'Qual nome devo dar para a pasta do projeto?',
        validate(FolderName: string){ 
            console.log(FolderName);
            
            //FolderName não pode ser Null
            if(!FolderName) 
                return EErros.ERR_NULL;
            //Não pode ter caracter especial, exeto: -, _, ' '
            if(/[^\w\s-]/.test(FolderName)) 
                return EErros.ERR_SPECIAL_CHARACTERES;
            //Não pode deixar com o mesmo nome da repo do github
            if(
                FolderName === EGitName.NODEJS_TS ||
                FolderName === EGitName.SCSS
            )
            return EErros.ERR_GIT_NAME;
            
            //Não pode existir o mesmo nome do FolderName
            try {
                const dir = path.resolve(FolderName);
                console.log(dir);
                fs.accessSync(dir, fs.constants.R_OK);
                return EErros.ERR_INVALID_FOLDER;
            // eslint-disable-next-line no-empty
            } catch (error) {}
            
            return true;

        }
    },
];