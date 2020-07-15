import express, {Router, Request, Response} from 'express'
import {body, validationResult} from 'express-validator'
import {DatabeseConnectionError} from '../errors/database-connection-error'
import {RequestValidationError} from '../errors/request-validation-error'

const router = Router()


router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('Passport must be between 4 and 20 charactes')
], 
async (req: Request, res: Response) => {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array())
    }

    const {email, password} = req.body

    console.log('Creating a user..')
    throw new DatabeseConnectionError()

    res.send({})
})


export {router as signupRouter}



