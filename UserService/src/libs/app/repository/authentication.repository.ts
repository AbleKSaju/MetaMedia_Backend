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
        email:data.email,
        password:data.password
    }
    const response=await schema.User.create(userData)
    return {status:true,message:"user created sucessfull"}
 }

//  verifyPassword:async(email,password:string)=>{
//     try {
//         const userData=await schema.User.findOne({email})
//         if(userData)
//     } catch (error) {
//         console.log('error in repositery authencation repo in userEmailexist',error);
//     }

//  }

}