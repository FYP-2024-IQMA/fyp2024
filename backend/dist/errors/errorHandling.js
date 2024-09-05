"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handleError;
const errorMappings_1 = require("./errorMappings");
function handleError(err) {
    var _a, _b;
    const mappedError = errorMappings_1.errorMapping[err.code];
    if (mappedError) {
        return {
            status: mappedError.status,
            message: (_a = err.message) !== null && _a !== void 0 ? _a : mappedError.message,
            details: (_b = err.details) !== null && _b !== void 0 ? _b : mappedError.message
        };
    }
    else {
        // if not in list, return generic 500 response
        return {
            status: 500,
            message: "Internal Server Error",
            details: err.message
        };
    }
}
