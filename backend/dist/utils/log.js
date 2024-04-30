"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
let logger;
function getLoggerInstance() {
    if (!logger) {
        const accessLogPath = process.env.ACCESS_LOG || path_1.default.join(__dirname, '../../logs/access.log');
        fs_1.default.mkdirSync(path_1.default.dirname(accessLogPath), { recursive: true });
        const accessLogStream = fs_1.default.createWriteStream(accessLogPath, { flags: 'a' });
        logger = (0, morgan_1.default)('combined', { stream: accessLogStream });
    }
    return logger;
}
exports.default = getLoggerInstance;
