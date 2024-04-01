import express from 'express'
import { HighlightController } from '../../controllers'
export default (dependencies:any)=> {
    const router = express()
    const {getHighlightsController,addNewHighlightController,deleteHighlightController} = HighlightController(dependencies)

    router.get('/getHighlights/:id',getHighlightsController)
    router.post('/addNewHighlight',addNewHighlightController)
    router.post('/deleteHighlight',deleteHighlightController)

    return router
}