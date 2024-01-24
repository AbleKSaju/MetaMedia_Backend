import { userProducer } from '../../../events/userproducer';
import { uploadImageToS3 } from '../../../utils/S3/s3UploadImage';
import {UserData} from '../../../utils/interfaces/userInterface'


export const loginWithGoogle_Usecase=async(dependencies:any)=>{

    const {
        repository: { authenticationRepository },
      } = dependencies;


      const executeFunction=async(data:UserData)=>{
                     console.log('iam here');

        const {profile,email,name,isGoogle,isFacebook}=data
        const responce=await authenticationRepository.finduser(email)
   

//user already exist 
if(responce.status==true){
    console.log('status is true',responce);
    
    //user is exist
   if(responce.finduser.isGoogle==true){
        //this user cretaed with gooogle aleady
        //login the user
        const {finduser}=responce
        console.log(finduser,'HHHHHHH');
        
       return {status:true,message:"login",user:finduser}

   }else{
    //user is not from the google so retrun a exist message
       return {status:false,message:"user is already exist",}
   }

    
}else{
//user is not exist
//create the user and login

//store the user image in to the s3

const imageName = `${email}_${Date.now()}.jpg`; 
const s3ImageUrl = await uploadImageToS3(profile, imageName);

const data={
    email,
    name,
    profile:s3ImageUrl,
    isGoogle,
    isFacebook
}
console.log(data,'LLLL');

const createUser=await authenticationRepository.createUser(data)
//and send to user service 

console.log('OOOOOO',createUser,"00000");

const { status,message}=createUser
if(status){
    //create user is sucess
    //produce a message to the auth service and save that 
    console.log('thsi sucess is the responce');
    const res=await  userProducer(createUser.response,"auth",'add-user')
    if(res){

        return ({status:true,message:"login",user:createUser.response})
    }

}else{
    return ({status:false,message:message})
}




}

        
        
          

        
      }

      return {executeFunction}

}