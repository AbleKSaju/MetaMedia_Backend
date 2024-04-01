import {Post} from '../database'

export default {
    createPost : async (data:any)=>{
        
        const tagsArray = data.data.tags.split(',');
    const location=JSON.parse(data.data.location)
    console.log(location,'%%%%%%%%%%%%%%%%%%%%%%%%%');
     let latitude:any
     let longitude:any
     let name:any
     if (location && location.latData) {
         latitude = location.latData.latitude 
         longitude = location.latData.longitude 
          name = location.latData.name 
    
       
    } else {
        latitude=0
        latitude=0
        name=''
    }


console.log(latitude,'------',longitude,'-----',name,'------');

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