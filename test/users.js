import { expect } from 'chai';
import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public/v2/')
const accessToken= "0cbf1fe5581d59d2ced6d94b5c91227050eff309ac548ef564040f56b21ef8b6"



describe('Users', () => {

    /**
     * Get all the users
     */
    it('Get/users', (done) => {
         request
        .get(`users?access-token=${accessToken}`)
        .end((err,res)=>{
            // console.log(err);
            // console.log(res);
            console.log(res.body);
             expect(res.body.data).to.not.be.null;
             done();
        })
        
    });
/**
 * Get information of individual user
 */
    it('Get/users/:id', (done) => {
        request
       .get(`users/2875?access-token=${accessToken}`)
       .end((err,res)=>{
           // console.log(err);
           console.log(res.body);
            // expect(res.body.data).to.not.be.null;
            expect(res.body.id).to.equal(2875)
            done();
       })
       
   });

   /**
    * Get users using query parameters
    */
   it('Get/users?queryParameters', () => {
       const url=`users?access-token=${accessToken}&page=5&gender=male&status=active`
    return request.get(url)
    .then((res)=>{
       // console.log(err);
       console.log(res.body);
        // expect(res.body.data).to.not.be.null;
        // expect(res.body.page).to.eq(5);
        // console.log(res.body[0]);
        // expect(res.body[0].id).to.eq(2893);
        
        (res.body).forEach((data) => {
            expect(data.gender).to.eq('male');
            expect(data.status).to.eq('active');

            });      
     })
   
    });

    /**
     * Post a new user with authorization header
     */
    it('Post/user with blank details', () => {
        const data ={}

        return request.post('users')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(data)
        .then((res)=>{
           console.log(res.body);
           console.log(res.body[0].field);
           console.log(res.body[0].message);
           expect(res.body[0].message).to.eq("can't be blank")
            // expect(res.body.email.message).to.eq("can't be blank")

        })
        
    });

    /**
     * Create a new user with data
     */
    it('Post/user with data', () => {
        const data ={
            email : "sony512@yahoo.com",
            name : "sony12",
            gender :"male",
            status : "active"
            }

        return request.post('users')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(data)
        .then((res)=>{
           console.log(res.body);
           console.log(res.body.id);
        //    expect(res.body[0].message).to.eq("can't be blank");
            // expect(res.body.email.message).to.eq("can't be blank")
            expect(res.status).to.eq(201)


        })
        
    });

    /**
     * Update the user
     */
    it('Put/users/:id', () => {
        
        const data ={
            name : `raviteja + ${Math.floor(Math.random()*10000)}`,
            status : 'active'
        }
        
        return request.put('users/2738')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(data)
        .then((res)=>{
            console.log(res.body);
            console.log(res.status);
            expect(res.body).to.deep.include(data)
        })
    });

    /**
     * Delete the user
     */
    it('Delete/users/:id', ()=>{

        return request.delete('users/2866')
        .set('Authorization', `Bearer ${accessToken}`)
        .then((res)=>{
            console.log(res.body);
            console.log(res.status);
            expect(res.status).to.eq(204);
           
        })
    })

});


