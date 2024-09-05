"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET;
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const jwksClient = (0, jwks_rsa_1.default)({
    jwksUri: 'https://dev-doimvjsv85uforrd.us.auth0.com/.well-known/jwks.json', // Replace with your Auth0 domain
});
function getKey(header, callback) {
    jwksClient.getSigningKey(header.kid, (err, key) => {
        if (err) {
            return callback(err);
        }
        const signingKey = key === null || key === void 0 ? void 0 : key.getPublicKey();
        callback(null, signingKey);
    });
}
const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(403).send('Error 401 : Access denied.');
    }
    try {
        console.log(token);
        jsonwebtoken_1.default.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
            console.log(err);
            if (err) {
                return res.status(401).send('Invalid token');
            }
            req.user = decoded;
            next();
        });
    }
    catch (err) {
        res.status(400).send('Invalid token.');
    }
};
exports.default = verifyToken;
