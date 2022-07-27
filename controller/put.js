import request from '../config/common'
import env from '../config/env'
import {dataForUpdate} from '../model/dataForPut'

const PUT = async function (path){
    return await request
    .put(path)
    .set('Authorization', `Bearer ${env.accessToken}`)
    .send(dataForUpdate);
    
}
 
export default PUT;