import request from '../config/common';
import env from '../config/env'
// const request = supertest('https://gorest.co.in/public/v2/');



export const createRandomUser = async () => {
    const userData = {
        email : `sony${Math.floor(Math.random()*10000)}@yahoo.com`,
        name : `sony${Math.floor(Math.random()*10000)}`,
        gender :"male",
        status : "active"
        }

    const res = await request
    .post('users')
    .set('Authorization', `Bearer ${env.accessToken}`)
    .send(userData);
       return res.body.id;
};