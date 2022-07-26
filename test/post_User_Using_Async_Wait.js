import { expect, use } from 'chai';
import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public/v2/');
const accessToken= "0cbf1fe5581d59d2ced6d94b5c91227050eff309ac548ef564040f56b21ef8b6";

let userId, postId;

describe('Using async wait', () => {
    
    before(async() => {
        const userData ={
            email : `sony${Math.floor(Math.random()*10000)}@yahoo.com`,
            name : `sony${Math.floor(Math.random()*10000)}`,
            gender :"male",
            status : "active"
            }
    
        await request
        .post('users')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(userData)
        .then((res)=>{
            expect(res.status).to.eq(201);
            expect(res.body).to.deep.include(userData);
            userId = res.body.id;
        });
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
        expect(res.body.id).to.eq(postId);
        expect(res.status).to.eq(200);
        
        
    }); 
});
describe('Negative Testing', () => {
    it('401 Authentication error', async() => {
            const data ={  
                user_id : userId,
                title : "hello this is my second id",
                body :"this is my second user id"    
                }
        
            const res= await request
            .post('posts')
            // .set('Authorization', `Bearer ${accessToken}`)
            .send(data)
    
               console.log(res.body);
               expect(res.statusCode).to.eq(401)
               expect(res.body.message).to.eq('Authentication failed')

            //    postId = res.body.id; 
    });

    it('422 Validation failed', async() => {
            const data ={  
                user_id : userId,
                title : "hello this is my second id",
                 
                }
        
            const res= await request
            .post('posts')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(data)
    
               console.log(res.body);
               expect(res.statusCode).to.eq(422)
               expect(res.body[0].field).to.eq('body');
               expect(res.body[0].message).to.eq("can't be blank");

            //    postId = res.body.id; 
    });
});

