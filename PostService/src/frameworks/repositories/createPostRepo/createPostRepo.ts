import {Post} from '../database'

export default {
    createPost : async (data:any)=>{
        
        const tagsArray = data.data.tags.split(',');
        const latitude = data.data.location && data.data.location.lat ? data.data.location.lat.latitude : 0;
        const longitude = data.data.location && data.data.location.lat ? data.data.location.lat.longitude : 0;
        const name = data.data.location && data.data.location.name ? data.data.location.name : '';

        const postData={
            userId:data.data.userId,
            description:data.data.description,
            mediaUrl:data.images,
            likes:[],
            comments:[],
            tags:tagsArray,
            location:{
                latitude: latitude,
                longitude: longitude,
                name:name
            },
            reports:[],
            postCropSize:data.data.postCropSize,
            postType:data.data.postType,
            showComment:data.data.showComment,
            showLikes:data.data.showLikes
        }

        const responce= await Post.create(postData)
        if(responce){
            return {status:true,data:responce}
        }else{
            return {status:false}
        }


    }
}