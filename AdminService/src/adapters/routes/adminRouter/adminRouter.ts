import express from 'express'
import {adminController} from '../../controllers'
export default (dependencies:any)=> {
    const router = express()
    const {ChangeUserStatusController} = adminController(dependencies)

    router.post('/changeUserStatus',ChangeUserStatusController)

    return router
}