import express, {Router, Request, Response} from 'express'
import {body} from 'express-validator'

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
(req: Request, res: Response) => {
    const {email, password} = req.body
})


export {router as signupRouter}



