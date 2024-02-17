import express from 'express'
import { highlightController } from '../../controllers'
export default (dependencies:any)=> {
    const router = express()
    const {getHighlightsController,addNewHighlightController} = highlightController(dependencies)

    router.get('/getHighlights',getHighlightsController)
    router.post('/addNewHighlight',addNewHighlightController)

    return router
}