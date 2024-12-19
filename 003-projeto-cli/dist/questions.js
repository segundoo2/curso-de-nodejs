"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questions = void 0;
/* eslint-disable import/no-unresolved */
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
// Enum
const choices_boilerplate_enum_1 = require("enum/choices-boilerplate.enum");
const errors_enum_1 = require("enum/errors.enum");
const git_name_enum_1 = require("enum/git-name.enum");
exports.questions = [
    {
        type: 'list',
        name: 'tech',
        message: 'Qual Boilerplate devo criar?',
        choices: [choices_boilerplate_enum_1.EChoicesBoilerPlate.NODEJS_TS, choices_boilerplate_enum_1.EChoicesBoilerPlate.SCSS],
    },
    {
        type: 'input',
        name: 'folderName',
        message: 'Qual nome devo dar para pasta do Projeto?',
        validate(folderName) {
            if (!folderName)
                return errors_enum_1.EErrors.ERROR_NULL;
            if (/[^\w\s-]/.test(folderName))
                return errors_enum_1.EErrors.ERROR_SPECIAL_CHARACTER;
            if (folderName === git_name_enum_1.EGitName.NODEJS_TS || folderName === git_name_enum_1.EGitName.SCSS)
                return errors_enum_1.EErrors.ERROR_GIT_NAME;
            try {
                const dir = node_path_1.default.resolve(folderName);
                node_fs_1.default.accessSync(dir, node_fs_1.default.constants.R_OK);
                return errors_enum_1.EErrors.ERROR_INVALID_FOLDER;
                // eslint-disable-next-line no-empty
            }
            catch (error) { }
            return true;
        },
    },
];
//# sourceMappingURL=questions.js.map