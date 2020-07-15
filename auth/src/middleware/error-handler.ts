import {Request, Response, NextFunction} from 'express'
import {DatabeseConnectionError} from '../errors/database-connection-error'
import {RequestValidationError} from '../errors/request-validation-error'

export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    if(err instanceof RequestValidationError){
        
        const formattedErrors = err.errors.map(error => {
            return {message: error.msg, field: error.param}
        })
        return res.status(err.statusCode).send({errors: err.serializeErrors()})
    }

    if(err instanceof DatabeseConnectionError){
        return res.status(err.statusCode).send({errors: err.serializeErrors()})
    }

    res.status(400).send({
        errors: [{message: 'Something went wrong'}]
    })
}