require ('dotenv').config();
import { expect, use } from 'chai';
import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public/v2/')
const accessToken= process.env.access_Token;


let randomNum = Math.floor(Math.random()*10000);

describe('Users', () => {
let userId;

/**
 * Create a user
 */
describe('Post', () => {
it('Post/user with data', () => {
    const data ={
        email : `sony${randomNum}@yahoo.com`,
        name : `sony${randomNum}`,
        gender :"male",
        status : "active"
        }

    return request.post('users')
    .set('Authorization', `Bearer ${accessToken}`)
    .send(data)
    .then((res)=>{
       console.log(res.body);
       console.log(res.body.id);
    
        expect(res.status).to.eq(201);
        expect(res.body).to.deep.include(data);
        userId = res.body.id;

    })
    
    });
}); 
/**
 * Get information of created user
 */
    describe('Get information of created user', () => {
    it('Get/users/:id', (done) => {
        request
       .get(`users/${userId}?access-token=${accessToken}`)
       .end((err,res)=>{
           // console.log(err);
           console.log(res.body);
            // expect(res.body.data).to.not.be.null;
            expect(res.body.id).to.be.eq(userId);
            done()
       })
    });
   });

   /**
    * Update the created user
    */
   describe('Update the created user', () => {
    it('Put/users/:id', () => {
        
        const data ={
            name : `automation + ${randomNum}`,
            status : 'active'
        }
        
        return request.put(`users/${userId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(data)
        .then((res)=>{
            console.log(res.body);
            console.log(res.status);
            expect(res.body).to.deep.include(data);
        })
    });
    });

    /**
     * Delete the created user
     */
    describe('Delete the created user', () => {
    it('Delete/users/:id', ()=>{

        return request.delete(`users/${userId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .then((res)=>{
            console.log(res.body);
            console.log(res.status);
            expect(res.status).to.eq(204);
        })
    })
});

});
