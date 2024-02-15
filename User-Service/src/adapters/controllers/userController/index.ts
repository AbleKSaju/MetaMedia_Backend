import chooseInterestController from "./chooseInterestController";
import getUserDataController from "./getUserDataController";
export default (dependencies:any)=>{
   return{
    chooseInterestController:chooseInterestController(dependencies),
    getUserDataController:getUserDataController(dependencies)
   }
}