import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import fs from 'fs';

const SECRET_KEY = process.env.JWT_SECRET as string;

import jwksRsa from 'jwks-rsa';

const jwksClient = jwksRsa({
    jwksUri: 'https://dev-doimvjsv85uforrd.us.auth0.com/.well-known/jwks.json', // Replace with your Auth0 domain
  });

interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
}

function getKey(header: jwt.JwtHeader, callback: (err: any, key?: string) => void) {
    jwksClient.getSigningKey(header.kid, (err, key) => {
      if (err) {
        return callback(err);
      }
      const signingKey = key?.getPublicKey();
      callback(null, signingKey);
    });
  }

const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.authToken;

    if (!token) {
        
        return res.status(403).send('Error 401 : Access denied.');
       
    }

    try {
        
        jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
            console.log(err);
            if (err) {
              return res.status(401).send('Invalid token');
            }
            req.user = decoded;
            next();
          });
        
        
    } catch (err) {
        res.status(400).send('Invalid token.');
    }
};

export default verifyToken;
