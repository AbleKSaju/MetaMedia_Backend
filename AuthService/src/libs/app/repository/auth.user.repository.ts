import schema from '../database/schema'

export default {

    createUser:async(data:any)=>{
        try {
            const userData={
                userId:data._id,
                name:data.name,
                email:data.email,
                password:data.password
            }


            const responce =await schema.authUser.create(userData)
            if(responce){
                return ({status:true,responce})
            }else{
                return ({status:false,message:'error in cretae user'})
            }
        } catch (error) {
            console.log('Error in the cretae user in the auth service / repositery ',error);
            
        }
    }
   
}
