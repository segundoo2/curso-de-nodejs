import fs from 'node:fs';
import path from 'node:path';

//enum
import { EStatusErrors } from 'enum/status-errors.enum';

export class UtilsFileUsers {
    private static _userPath = ['assets', 'files']

    public static _ValidateFolder(pathArray: string | Array<string>){
        if(Array.isArray(pathArray)) {
            return fs.existsSync(path.resolve(...this._userPath, ...pathArray));
        }

        return fs.existsSync(path.resolve(...this._userPath, pathArray));
    }

    public static createFolderUser(pathArray: string | Array<string>){
        if(!this._ValidateFolder(pathArray)) {
            if(Array.isArray(pathArray)) {
                return fs.mkdirSync(path.resolve(...this._userPath, ...pathArray));
            }

            return fs.mkdirSync(path.resolve(...this._userPath, pathArray));

        }
    }

    public static deleteFolderUser(pathArray: string | Array<string>){
        if(this._ValidateFolder(pathArray)) {
            if(Array.isArray(pathArray)) {
                return fs.rmSync(path.resolve(...this._userPath, ...pathArray), { 
                    recursive: true 
                });
            }

            return fs.rmSync(path.resolve(...this._userPath, pathArray), { recursive: true });
        }

        throw new Error(EStatusErrors.E404);
    }
}