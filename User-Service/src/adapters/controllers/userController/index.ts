import chooseInterestController from "./chooseInterestController";
import getUserDataController from "./getUserDataController";
import getAllUserForChatController from "./getAllUserForChatController";
import getUserById_Controller from "./getUserById_Controller";
import getUsersByNameController from "./getUsersByName.Controller";
import getUsersDataByIdController from "./getUsersDataByIdController";
import getAllUsersDataController from "./getAllUsersDataController";
import getSearchUserController from "./getSearchUserController";
import followUserController from "./followUserController";
import ChangeUserStatusController from "./ChangeUserStatusController";
import BlockAndUnblockUserController from "./BlockAndUnblockUserController";
import savePostController from "./savePostController";
import suggetionController from "./suggetionController";
import generatevapidKeysController from "./generatevapidKeysController";
import SubcribeToAwsSNSController from "./SubcribeToAwsSNSController";
export default (dependencies:any)=>{
   return{
    chooseInterestController:chooseInterestController(dependencies),
    getUserDataController:getUserDataController(dependencies),
    getAllUserForChatController:getAllUserForChatController(dependencies),
    getUserById_Controller:getUserById_Controller(dependencies),
    getUsersByNameController:getUsersByNameController(dependencies),
    getUsersDataByIdController:getUsersDataByIdController(dependencies),
    BlockAndUnblockUserController:BlockAndUnblockUserController(dependencies),
    getAllUsersDataController:getAllUsersDataController(dependencies),
    getSearchUserController:getSearchUserController(dependencies),
    followUserController:followUserController(dependencies),
    ChangeUserStatusController:ChangeUserStatusController(dependencies),
    savePostController:savePostController(dependencies),
    suggetionController:suggetionController(dependencies),
    generatevapidKeysController:generatevapidKeysController(dependencies),
    SubcribeToAwsSNSController:SubcribeToAwsSNSController(dependencies)


   }
}