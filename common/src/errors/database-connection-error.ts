import {CustomError} from './custom-error'
export class DatabeseConnectionError extends CustomError {
    statusCode = 500
    reason = 'Error connecting to database'

    constructor(){
        super('error connecting to db')

        Object.setPrototypeOf(this, DatabeseConnectionError.prototype)
    }

    serializeErrors(){
        return [
            {message: this.reason}
        ]
    }
}