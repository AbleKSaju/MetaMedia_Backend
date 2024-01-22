import {verifyPassword} from '../../../utils'


export const loginUser_usecases=(dependencies:any)=>
{

    const {
        repository: { authuserRepositery },
      } = dependencies;

    const executeFunction=async(email:string,password:string)=>{
  
        
        const responce=await authuserRepositery.finduser(email)
        
         

        //find user email and password is valid
        if(!responce.status){
            return ({message:"Email is not valid",status:false})
            
        }else{
            const {finduser}=responce

            const validUser=await verifyPassword(password,finduser.password)

            if(validUser){

                return ({status:true,finduser})
            }else{
                return ({message:"password is not matching",status:false})
            }



        }
        

       //get user data in the db in repo
      

        //return user 
    }



    return {executeFunction}



}