import request from 'supertest'
import {app} from '../../app'

it('fail when email that does not exists is supplied', async () => {
    await request(app)
       .post('/api/users/signin')
       .send({
           email: 'test@test.com',
           password: 'password'
       })
       .expect(400) 
})

it('fails when an incorrect password is supplied', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
         email: 'test@test.ru',
         password: 'password' 
      })
      .expect(201)

    await request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@test.ru',
        password: 'asdfsdf'
    })
    .expect(400)
})

it('responsed with a cookie when gived valid credentials', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
       email: 'test@test.ru',
       password: 'password' 
    })
    .expect(201)

  const response = await request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@test.ru',
        password: 'password'
    })
    .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
})