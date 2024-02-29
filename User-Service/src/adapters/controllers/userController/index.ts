import chooseInterestController from "./chooseInterestController";
import getUserDataController from "./getUserDataController";
import getAllUserController from "./getAllUser.controller";
import getUserById_Controller from "./getUserById_Controller";
import getUsersByNameController from "./getUsersByName.Controller";
import getUsersDataByIdController from "./getUsersDataByIdController";

export default (dependencies:any)=>{
   return{
    chooseInterestController:chooseInterestController(dependencies),
    getUserDataController:getUserDataController(dependencies),
    getAllUserController:getAllUserController(dependencies),
    getUserById_Controller:getUserById_Controller(dependencies),
    getUsersByNameController:getUsersByNameController(dependencies),
    getUsersDataByIdController:getUsersDataByIdController(dependencies)
   }
}