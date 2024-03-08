import {createUserConsumer} from './kafkaConsumerContoller'
import {getUserByNameController,getAllUsersController,createNewUserController,deleteUserByNameController} from './searchController'

export default (dependencies:any)=>{
 return {
  
    createUserConsumer: (data: any) => createUserConsumer(dependencies, data),
    getUserByNameController:getUserByNameController(dependencies),
    getAllUsersController:getAllUsersController(dependencies),
    createNewUserController:createNewUserController(dependencies),
    deleteUserByNameController:deleteUserByNameController(dependencies)
   
 }

}