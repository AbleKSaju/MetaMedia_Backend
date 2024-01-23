import loginUserController from "./login.user.controller";
import loginWithGoogleController from "./loginWithGoogleController";
export default (dependencies:any)=>{
   return{
    loginUserController:loginUserController(dependencies),
    loginWithGoogle:loginWithGoogleController(dependencies)
   }
}