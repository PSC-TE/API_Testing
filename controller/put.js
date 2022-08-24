import request from '../config/common'
require('dotenv').config();
const TOKEN = process.env.USER_TOKEN;
import {dataForUpdate} from '../model/dataForPut'

const PUT = async function (path){
    return await request
    .put(path)
    .set('Authorization', TOKEN)
    .send(dataForUpdate);
    
}
 
export default PUT;