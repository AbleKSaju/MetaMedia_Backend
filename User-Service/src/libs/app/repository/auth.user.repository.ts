import schema from '../database/schema'

export default {

    createUser:async(data:any)=>{
        try {
            const userData={
                userId:data._id,
                name:data.name,
                profile:data.profile,
                email:data.email,
                password:data.password,
                isGoogle:data.isGoogle,
                isFacebook:data.isFacebook
            }

            const responce =await schema.User.create(userData)
            if(responce){
                return ({status:true,responce})
            }else{
                return ({status:false,message:'error in cretae user'})
            }
        } catch (error) {
            console.log('Error in the cretae user in the auth service / repositery ',error);
            
        }
    },
    finduser:async(email:string)=>{
        try {
            const  finduser=await schema.User.findOne({email})
            if(finduser){

                return ({status:true,finduser})
            }else{
                return {status:false}
            }
        } catch (error) {
            console.log('error in repositery authencation repo in userEmailexist',error);
        }
     },

   
   
}
