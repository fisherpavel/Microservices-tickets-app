export class DatabeseConnectionError extends Error {
    reason = 'Error connecting to database'

    constructor(){
        super()

        Object.setPrototypeOf(this, DatabeseConnectionError.prototype)
    }
}