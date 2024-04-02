import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { Secret } from "jsonwebtoken";
import jwt from "jsonwebtoken";

interface RequestWithUser extends ExpressRequest {
    user?: any;
}

export const signinverify = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization;
            
            req.user = await verifyToken(token);
            next();
        } else {
            throw new Error('Unauthorized'); 
        }
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

async function verifyToken(token: string): Promise<any> {
    const user = jwt.verify(
        token,
        process.env.ACTIVE_SECRET as string
      );
    return user;  
}
