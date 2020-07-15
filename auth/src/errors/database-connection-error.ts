export class DatabeseConnectionError extends Error {
    statusCode = 500
    reason = 'Error connecting to database'

    constructor(){
        super()

        Object.setPrototypeOf(this, DatabeseConnectionError.prototype)
    }

    serializeErrors(){
        return [
            {message: this.reason}
        ]
    }
}