import { expect, use } from 'chai';
import request from '../config/common'
import env from '../config/env'

import {createRandomUser} from '../model/user';


describe('Using async wait', () => {
    let userId, postId;

    before( async() => {
       userId =await createRandomUser();
    });
    it('Post/users', async() => {    
        const data ={  
            user_id : userId,
            title : "hello this is my second id",
            body :"this is my second user id"    
            }
    
        const res= await request
        .post('posts')
        .set('Authorization', `Bearer ${env.accessToken}`)
        .send(data)

           console.log(res.body);
           expect(res.body).to.deep.include(data)
           postId = res.body.id;        
    });

    it('GET/posts/id', async() => {
        const res=await request
        .get(`posts/${postId}`)
        .set('Authorization', `Bearer ${env.accessToken}`)
        
        console.log(res.body);
        expect(res.body.id).to.eq(postId);
        expect(res.status).to.eq(200);    
    });

   
});
