import request from '../config/common'
import env from '../config/env'

const DELETE = async function (path){
    return await request
    .delete(path)
    .set('Authorization', `Bearer ${env.accessToken}`)
    
}
export default DELETE;