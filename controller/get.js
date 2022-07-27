import request from '../config/common'
import env from '../config/env'

const GET = async function (path){
    return await request 
    .get(path)
    .set('Authorization', `Bearer ${env.accessToken}`)
}
 
export default GET;