"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
// eslint-disable-next-line node/no-unpublished-import
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const log_1 = __importDefault(require("./utils/log"));
const gameRoutes_1 = __importDefault(require("./routes/gameRoutes"));
const slotMachineRoutes_1 = __importDefault(require("./routes/slotMachineRoutes"));
dotenv_1.default.config();
// set up express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// enables CORS, should be removed if fe and be in same origin
app.use((0, cors_1.default)());
app.use((0, log_1.default)()); // access and error log
app.use(express_1.default.json()); // parsing of JSON bodies
// welcome
app.get('/', (req, res) => res.send('Welcome to Kanon Gaming'));
// routes
app.use('/api/games', gameRoutes_1.default);
app.use('/api/slot-machine', slotMachineRoutes_1.default);
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on http://localhost:${PORT}`);
});
