
import express from 'express'
import searchController from '../../controllers'


export default (dependencies:any)=> {
    const {getUserByNameController,getAllUsersController,createNewUserController,deleteUserByNameController}=searchController(dependencies)
    const router = express()

    router.get('/getUserByName',getUserByNameController)
    router.get('/getAllusers',getAllUsersController)
    router.post('/createUser',createNewUserController)
    router.post('/deleteUserByName',deleteUserByNameController)

   
    return router
}      




 