

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
    console.log(response, "User created successfully");

    return {status:true,message:"user creted sucessful"}
 }

}