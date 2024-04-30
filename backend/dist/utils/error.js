"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendServerError = void 0;
function sendServerError(res, message) {
    if (process.env.NODE_ENV === 'production') {
        // eslint-disable-next-line no-console
        console.error(message);
        res.status(500).send('Internal server error');
    }
    else {
        res.status(500).send(message);
    }
}
exports.sendServerError = sendServerError;
