import request from '../config/common'
import env from '../config/env'
const faker = require ('faker')

export const createRandomUser = async () => {
    const userData = {
        postId :
        name : faker.name(),
        email : faker.internet.email(),
        body : faker.lorem.paragraphs()
        }

    const res = await request
    .post('users')
    .set('Authorization', `Bearer ${env.accessToken}`)
    .send(userData);
       return res.body.id;
};