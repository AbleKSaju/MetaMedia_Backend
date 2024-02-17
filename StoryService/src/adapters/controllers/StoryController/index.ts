import AddStoryController from "./addStoryController";
import deleteStoryController from "./deleteStoryController";
import getStoriesController from "./getStoriesController";

export default (dependencies:any)=>{
    return{
        AddStoryController:AddStoryController(dependencies),
        DeleteStoryController:deleteStoryController(dependencies),
        getStoriesController:getStoriesController(dependencies)
    }
}