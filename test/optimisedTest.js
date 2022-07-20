import { expect, use } from 'chai';
import {request} from '../model/user'
// import supertest from 'supertest';
// const request = supertest('https://gorest.co.in/public/v2/');
const accessToken = require('../config/env')


describe('Using async wait', () => {
    let userId, postId;

    before( async() => {
       userId = await createRandomUser() 
    });
    it('Post/users', async() => {    
        const data ={  
            user_id : userId,
            title : "hello this is my second id",
            body :"this is my second user id"    
            }
    
        const res= await request
        .post('posts')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(data)

           console.log(res.body);
           expect(res.body).to.deep.include(data)
           postId = res.body.id;        
    });

    it('GET/posts/id', async() => {
        const res=await request
        .get(`posts/${postId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        
        console.log(res.body);
        expect(res.body.id).to.eq(postId);
        expect(res.status).to.eq(200);    
    });

   
});
