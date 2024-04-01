import addNewHighlightController from "./addNewHighlightController";
import getHighlightsController from "./getHighlightsController";
import deleteHighlightController from "./deleteHighlightController";
export default (dependencies:any)=>{
 return {
    getHighlightsController:getHighlightsController(dependencies),
    addNewHighlightController:addNewHighlightController(dependencies),
    deleteHighlightController:deleteHighlightController(dependencies)
 }
}