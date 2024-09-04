"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handleError;
const errorMappings_1 = require("./errorMappings");
function handleError(err) {
    var _a;
    const mappedError = errorMappings_1.errorMapping[err.code];
    if (mappedError) {
        return {
            status: mappedError.status,
            message: mappedError.message,
            details: (_a = err.details) !== null && _a !== void 0 ? _a : mappedError.message
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
