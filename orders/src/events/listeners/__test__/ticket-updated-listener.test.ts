import mongoose from 'mongoose'
import {TicketUpdatedEvent} from '@sgtickets/common'
import {TicketUpdatedListener} from '../ticket-updated-listener'
import {natsWrapper} from '../../../nats-wrapper'
import {Ticket} from '../../../models/ticket'
import { Message } from 'node-nats-streaming'

const setup = async () => {
    const listener = new TicketUpdatedListener(natsWrapper.client)

    const ticket = Ticket.build({
        id: mongoose.Types.ObjectId().toHexString(),
        title: 'asdf',
        price: 20
    })
    await ticket.save()

    const data: TicketUpdatedEvent['data'] = {
        id: ticket.id,
        version: ticket.version + 1,
        title: 'asdffda',
        price: 111,
        userId: 'asdfasdf'
    }
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return {msg, data, ticket, listener}
}

it('finds, updates and saves a ticket', async () => {
    const {msg, data, ticket, listener} = await setup()

    await listener.onMessage(data, msg)

    const updatedTicket = await Ticket.findById(ticket.id)

    expect(updatedTicket!.title).toEqual(data.title)
    expect(updatedTicket!.price).toEqual(data.price)
    expect(updatedTicket!.version).toEqual(data.version)
})

it('acks the message', async () => {
    const {msg, data, listener} = await setup()

    await listener.onMessage(data, msg)

    expect(msg.ack).toHaveBeenCalled()
})

it('does not call ack if the event has a skipped version number', async () => {
    const {msg, data, ticket, listener} = await setup()

    data.version = 10

    try {
        await listener.onMessage(data, msg)
    } catch(err){}

    expect(msg.ack).not.toHaveBeenCalled()
})