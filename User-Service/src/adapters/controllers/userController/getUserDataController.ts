import { Request,Response } from "express";

export default (dependencies:any)=>{
    const {useCase:{getUserData_Usecase}}=dependencies

    const getUserDataController=async(req:Request,res:Response)=>{
        console.log(req.body);
        
        const {email}=req.body        
        console.log(email,"EMAIL");
        
        const response = await getUserData_Usecase(dependencies)?.executeFunction(email)
        if(response){
            const data={
                _id:response.userData.basicInformation.userId,
                email:response.userData.basicInformation.email,
                name:response.userData.basicInformation.fullName,
                dateOfBirth:response.userData.basicInformation.dateOfBirth,
                isGoogle:response.userData.basicInformation.isGoogle,
                isFacebook:response.userData.basicInformation.isFacebook,
                gender:response.userData.basicInformation.gender,
                phoneNumber:response.userData.basicInformation.phoneNumber,
                userName:response.userData.basicInformation.userName,
                location:response.userData.profile.location,
                interests:response.userData.profile.interests,
                profile:response.userData.profile.profileUrl,
                bio:response.userData.profile.bio,
            }
            res.json({status:response?.status , message:response?.message, user:data})
        }else{
         res.json({status:false , message:'response error'})
        }
    }
    return getUserDataController
}