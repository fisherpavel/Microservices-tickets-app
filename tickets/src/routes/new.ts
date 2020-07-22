import express, {Request, Response} from 'express'
import {body} from 'express-validator'
import {requireAuth, validateRequest} from '@sgtickets/common'

const router = express.Router()

router.post('/api/tickets', requireAuth, [
    body('title')
      .not()
      .isEmpty()
      .withMessage('Titled is required'),
    body('price')
      .isFloat({gt: 0})
      .withMessage('Price must be greater than 0')
], validateRequest, async (req:Request, res: Response) => {
    res.sendStatus(200)
})


export {router as createTicketRouter}