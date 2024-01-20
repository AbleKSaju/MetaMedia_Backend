import express from 'express'


import {AuthencationController} from '../../libs/controller'

export default (dependencies:any)=> {
    const router=express.Router()

    const {createUserController}=AuthencationController(dependencies)

    router.post('/createUser',createUserController)

    return router

}