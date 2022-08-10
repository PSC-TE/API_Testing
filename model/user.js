import request from '../config/common';
require ('dotenv').config();
// const request = supertest('https://gorest.co.in/public/v2/');
import { faker } from '@faker-js/faker';
let TOKEN = process.env.USER_TOKEN;

export const createRandomUser = async () => {
    const userData = {
        email : faker.internet.email(),
        name : faker.name.findName(),
        gender : "male",
        status : "active"
        }

    const res = await request
    .post('users')
    .set('Authorization', `Bearer ${TOKEN}`)
    .send(userData);
       return res.body.id;
};