import express from 'express'
import { highlightController } from '../../controllers'
export default (dependencies:any)=> {
    const router = express()
    const {getHighlightsController,addNewHighlightController,deleteHighlightController} = highlightController(dependencies)

    router.get('/getHighlights',getHighlightsController)
    router.post('/addNewHighlight',addNewHighlightController)
    router.post('/deleteHighlight',deleteHighlightController)

    return router
}