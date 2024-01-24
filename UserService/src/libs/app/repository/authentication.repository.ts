import schema from "../database/schema"
export default 
{

 userEmailExist:async(email:string)=>{
    try {
        const  responce=await schema.User.findOne({email})
        return responce
    } catch (error) {
        console.log('error in repositery authencation repo in userEmailexist',error);
    }
 },

 createUser:async(data:any)=>{
    const userData={
        name:data.name,
        profile:data.profile,
        email:data.email,
        password:data.password,
        isGoogle:data.isGoogle,
        isFacebook:data.isFacebook
    }
    const response=await schema.User.create(userData)
    if(response){

        return {status:true,message:"user created sucessfull",response}
    }else{
        return { status:false,message:"user cretion failed"}
    }
 },
 finduser:async(email:string)=>{
    try {
        const  finduser=await schema.User.findOne({email})
        if(finduser){
            console.log('hi---');
            
            return ({status:true,finduser})
        }else{
            return {status:false}
        }
    } catch (error) {
        console.log('error in repositery authencation repo in userEmailexist',error);
    }
 },


//  verifyPassword:async(email,password:string)=>{
//     try {
//         const userData=await schema.User.findOne({email})
//         if(userData)
//     } catch (error) {
//         console.log('error in repositery authencation repo in userEmailexist',error);
//     }

//  }

}