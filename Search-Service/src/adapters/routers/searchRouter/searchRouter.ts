
import express from 'express'
import searchController from '../../controllers'


export default (dependencies:any)=> {
    const {getUserByNameController,getAllUsersController}=searchController(dependencies)
    const router = express()

    router.get('/getUserByName',getUserByNameController)
    router.get('/getAllusers',getAllUsersController)

   
    return router
}      




 