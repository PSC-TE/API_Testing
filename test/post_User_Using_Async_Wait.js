require('dotenv').config();
const TOKEN = process.env.USER_TOKEN;
import { expect, use } from 'chai';
import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public/v2/');
import { faker } from '@faker-js/faker';

let userId, postId;
let randomNum = Math.floor(Math.random()*10000)

describe('Using async wait', () => {
    
    before(async() => {
        const userData ={
            email : faker.internet.email(),
            name : faker.name.findName(),
            gender :"male",
            status : "active"
            }
    
        await request
        .post('users')
        .set('Authorization', TOKEN)
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
        expect(res.body.id).to.eq(postId);
        expect(res.status).to.eq(200);
        
        
    }); 
});
describe('Negative Testing', () => {
    it('401 Authentication error', async() => {
            const data ={  
                user_id : userId,
                title : faker.lorem.sentence(),
                body : faker.lorem.paragraph()    
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
                title : faker.lorem.paragraph(),
                 
                }
        
            const res= await request
            .post('posts')
            .set('Authorization', TOKEN)
            .send(data)
    
               console.log(res.body);
               expect(res.statusCode).to.eq(422)
               expect(res.body).to.deep.include({ field: 'body', message: "can't be blank" })
               expect(res.body[0].field).to.eq('body');
               expect(res.body[0].message).to.eq("can't be blank");

            //    postId = res.body.id; 
    });
});

