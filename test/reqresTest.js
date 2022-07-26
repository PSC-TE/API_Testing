import request from '../config/common'
import {expect} from 'chai'

describe.skip('reqres suite',()=>{
    it('get/resources', async()=>{
        let res = await request.get('{resource}')
        console.log(res.body.data);
        expect(res.status).to.be.eq(200);    
    });

    it('reqres get users wrt page', async()=>{
        const res = await request
        .get('users?page=2&per_page=5')
        console.log(res.body.data);
        expect(res.body.page).to.be.eq(2);
        expect(res.body.per_page).to.be.eq(5);

    });

     it('reqres get users wrt id', async()=>{
        const res = await request
        .get('users/10')
        console.log(res.body.data);
        expect(res.body.data.id).to.be.eq(10);
        expect(res.status).to.be.eq(200);
    });



})