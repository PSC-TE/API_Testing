import { expect, use } from 'chai';
import request from '../config/common'
require('dotenv').config();
const TOKEN = process.env.USER_TOKEN;
import { faker } from '@faker-js/faker';
import {createRandomUser} from '../model/user';


describe('Using async wait', () => {
    let userId, postId;

    before( async() => {
       userId =await createRandomUser();
    });
    
    it('Post/users', async() => {    
        const data ={  
            user_id : userId,
            title : faker.lorem.sentence(),
            body : faker.lorem.paragraph()    
            }
    
        const res= await request
        .post('posts')
        .set('Authorization', TOKEN)
        .send(data)

           console.log(res.body);
           expect(res.body).to.deep.include(data)
           postId = res.body.id;        
    });

    it('GET/posts/id', async() => {
        const res=await request
        .get(`posts/${postId}`)
        .set('Authorization', TOKEN)
        
        console.log(res.body);
        expect(res.body.id).to.eq(postId);
        expect(res.status).to.eq(200);   
    });

   
});
