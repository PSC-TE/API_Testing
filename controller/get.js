import request from '../config/common'
require('dotenv').config();
const TOKEN = process.env.USER_TOKEN;
const GET = async function (path){
    return await request 
    .get(path)
    .set('Authorization', `Bearer ${TOKEN}`)
}
 
export default GET;