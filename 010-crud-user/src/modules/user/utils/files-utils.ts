import fs from 'node:fs';
import path from 'node:path';

export class UtilsFileUsers {
    private static _userPath = ['assets', 'files']

    public static _ValidateFolder(userId: string){
        return fs.existsSync(path.resolve(...this._userPath, userId));
    }

    public static createFolderUser(userId: string){
        if(!this._ValidateFolder(userId)) {
            fs.mkdirSync(path.resolve(...this._userPath,userId));
        }
    }

    public static deleteFolderUser(userId: string){
        if(this._ValidateFolder(userId)) {
            return fs.rmSync(path.resolve(...this._userPath,userId), { recursive: true });
        }
    }
}