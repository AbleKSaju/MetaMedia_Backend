import {Post} from '../database'

export default {
    findPostById : async (postId:any)=>{
        try {
            return await Post.findById(postId)
        } catch (error) {
            console.log('Error in find post by Id');
            
        }
       
        

    }
}