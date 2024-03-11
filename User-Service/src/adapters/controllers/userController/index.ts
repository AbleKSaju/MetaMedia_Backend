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

    getAllUsersDataController:getAllUsersDataController(dependencies),
    getSearchUserController:getSearchUserController(dependencies),
    followUserController:followUserController(dependencies),
    ChangeUserStatusController:ChangeUserStatusController(dependencies),

    savePostController:savePostController(dependencies),
    suggetionController:suggetionController(dependencies)

   }
}