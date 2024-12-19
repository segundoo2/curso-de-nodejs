"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenFile = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const shelljs_1 = __importDefault(require("shelljs"));
// Interface
const choices_boilerplate_enum_1 = require("../enum/choices-boilerplate.enum");
// Enum
const git_name_enum_1 = require("../enum/git-name.enum");
class GenerateController {
    gen(answers) {
        try {
            switch (answers.tech) {
                case choices_boilerplate_enum_1.EChoicesBoilerPlate.NODEJS_TS:
                    this._execPath(git_name_enum_1.EGitName.NODEJS_TS, answers.folderName);
                    break;
                case choices_boilerplate_enum_1.EChoicesBoilerPlate.SCSS:
                    this._execPath(git_name_enum_1.EGitName.SCSS, answers.folderName);
                    break;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    _execPath(gitName, folderName) {
        try {
            shelljs_1.default.cd(node_path_1.default.resolve());
            shelljs_1.default.exec(`git clone git@github.com:troquatte/${gitName}.git`);
            node_fs_1.default.renameSync(`${node_path_1.default.join(node_path_1.default.resolve(), gitName)}`, `${node_path_1.default.join(node_path_1.default.resolve(), folderName)}`);
            console.log('Arquivo criado com Sucesso!');
            return shelljs_1.default.exit();
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.GenFile = new GenerateController();
//# sourceMappingURL=generate.controller.js.map