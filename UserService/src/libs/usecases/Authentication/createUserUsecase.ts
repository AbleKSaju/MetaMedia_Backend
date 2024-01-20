import { useCallbackRef } from "@mantine/hooks";

interface UserData {
    name: string;
    email: string;
    password: string;
}

export const createUser_Usecases=(dependencies:any)=>{

    const {
        repository:{authenticationRepository}
    }=dependencies


    if (!authenticationRepository) {
        return console.log("Error: User Repository not found");
      }


      const executeFunction=async(data:UserData)=>{

        const UserExist=await authenticationRepository.userEmailExist(data.email)
        console.log('this is user exist responce',UserExist);
        

        if(UserExist){
            return {status:false,message:"User already exist"}
        }

        const res=await authenticationRepository.createUser(data);
      
        if(res.status){
              
            return {status:true,message:res.message}
        }

      }


      return {
        executeFunction
      }

}