import { validationResult } from "express-validator";
import getErrorField from "./error-field.js";
import type { Request, Response, NextFunction } from "express";
import type { ValidationError } from "express-validator";

export default function checkErrors(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = errors.array()[0];
        res.status(400).json({ 
            success: false, 
            errorMessage: error.msg,
            errorField: getErrorField(error.type === 'field' ? error.path : null) // id of the element
        });
        return;
    }
    next();
}