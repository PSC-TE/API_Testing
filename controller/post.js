import request from '../config/common'
require('dotenv').config();
const TOKEN = process.env.USER_TOKEN;
import {userData} from '../model/userDataForPost'

const POST = async function (path){
    return await request
    .post(path)
    .set('Authorization', TOKEN)
    .send(userData);
    
}
 
export default POST;