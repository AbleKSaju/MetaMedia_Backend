import loginUserController from "./login.user.controller";
export default (dependencies:any)=>{
   return{
    loginUserController:loginUserController(dependencies)
   }
}