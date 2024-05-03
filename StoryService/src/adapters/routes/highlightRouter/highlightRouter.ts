import express from 'express'
import { HighlightController } from '../../Controllers'
import authMiddlewawre from '../../../Utils/Middleware/authMiddleware'
export default (dependencies:any)=> {
    const router = express()
    const {getHighlightsController,addNewHighlightController,deleteHighlightController} = HighlightController(dependencies)

    router.get('/getHighlights/:id', authMiddlewawre , getHighlightsController)
    router.post('/addNewHighlight', authMiddlewawre , addNewHighlightController)
    router.post('/deleteHighlight', authMiddlewawre , deleteHighlightController)

    return router
}