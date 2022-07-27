import request from '../config/common'
import env from '../config/env'
import {userData} from '../model/userDataForPost'

const POST = async function (path){
    return await request
    .post(path)
    .set('Authorization', `Bearer ${env.accessToken}`)
    .send(userData);
    
}
 
export default POST;