import addNewHighlightController from "./addNewHighlightController"
import getHighlightsController from "./getHighlightsController"
export default (dependencies:any)=>{
 return {

    getHighlightsController:getHighlightsController(dependencies),
    addNewHighlightController:addNewHighlightController(dependencies)
     
 }

}