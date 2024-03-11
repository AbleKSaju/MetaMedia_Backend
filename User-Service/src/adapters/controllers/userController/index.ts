import chooseInterestController from "./chooseInterestController";
import getUserDataController from "./getUserDataController";
import getAllUserForChatController from "./getAllUserForChatController";
import getUserById_Controller from "./getUserById_Controller";
import getUsersByNameController from "./getUsersByName.Controller";
import getUsersDataByIdController from "./getUsersDataByIdController";
import savePostController from "./savePostController";
import suggetionController from "./suggetionController";
export default (dependencies:any)=>{
   return{
    chooseInterestController:chooseInterestController(dependencies),
    getUserDataController:getUserDataController(dependencies),
    getAllUserForChatController:getAllUserForChatController(dependencies),
    getUserById_Controller:getUserById_Controller(dependencies),
    getUsersByNameController:getUsersByNameController(dependencies),
    getUsersDataByIdController:getUsersDataByIdController(dependencies),
    savePostController:savePostController(dependencies),
    suggetionController:suggetionController(dependencies)
   }
}