import request from '../config/common'
require('dotenv').config();
const TOKEN = process.env.USER_TOKEN;
import {userData} from '../model/userDataForPost'

const POST = async function (path){
    return await request
    .post(path)
    .set('Authorization', `Bearer ${TOKEN}`)
    .send(userData);
    
}
 
export default POST;