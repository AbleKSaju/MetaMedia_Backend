
import express from 'express'
import {postController} from '../../controllers'
export default (dependencies:any)=> {

    const router = express()
    const {sayHelloController} = postController(dependencies)

    router.get('/sayHello',sayHelloController)




    return router
}