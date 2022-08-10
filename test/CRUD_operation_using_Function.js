
import POST from '../controller/post';
import GET from '../controller/get';
import PUT from '../controller/put';
import DELETE from '../controller/delete';
import {expect} from 'chai';
import {assert} from 'chai';
import {userData} from '../model/userDataForPost';
import {dataForUpdate} from '../model/dataForPut';

describe('optimization', () => {
let userId

    it('Post request', async() => {
        let res = await POST('users')
        console.log(res.body);
        console.log(res.status);
        expect(res.statusCode).to.be.eq(201)
        assert.hasAnyKeys(res.body, 'id');
        expect(res.body).to.deep.include(userData)
        userId = res.body.id;
    });

    it('Get request', async() => {
        let res=await GET(`users/${userId}`)
        console.log(res.body);
        console.log(res.status);
        expect(res.status).to.be.eq(200); 
        expect(res.body.id).to.be.eq(userId) 
    });

    it('Put request', async() => {
        let res = await PUT(`users/${userId}`)
        console.log(res.body);
        console.log(res.status);
        expect(res.body).to.deep.include(dataForUpdate);
    });

    it('Delete request', async() => {
        let res = await DELETE(`users/${userId}`)
        console.log(res.body)
        console.log(res.status);
        expect(res.status).to.eq(204);
    });
});
