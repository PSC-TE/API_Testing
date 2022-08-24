import request from '../config/common'
require('dotenv').config();
const TOKEN = process.env.USER_TOKEN;
const DELETE = async function (path){
    return await request
    .delete(path)
    .set('Authorization', TOKEN)
    
}
export default DELETE;