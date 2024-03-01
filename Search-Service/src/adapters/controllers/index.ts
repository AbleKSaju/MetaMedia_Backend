import {createUserConsumer} from './kafkaConsumerContoller'
import {getUserByNameController,getAllUsersController} from './searchController'

export default (dependencies:any)=>{
 return {
  
    createUserConsumer: (data: any) => createUserConsumer(dependencies, data),
    getUserByNameController:getUserByNameController(dependencies),
    getAllUsersController:getAllUsersController(dependencies)
   
 }

}