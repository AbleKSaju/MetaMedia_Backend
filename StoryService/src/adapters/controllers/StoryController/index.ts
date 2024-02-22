import AddStoryController from "./addStoryController";
import deleteStoryController from "./deleteStoryController";
import getStoriesController from "./getStoriesController";
import getAllStoriesController from "./getAllStoriesController";
import GetMyAllStoriesForHighLighController from "./GetMyAllStoriesForHighLighController";

export default (dependencies:any)=>{

    return{
        AddStoryController:AddStoryController(dependencies),

        DeleteStoryController:deleteStoryController(dependencies),

        getStoriesController:getStoriesController(dependencies),

        getAllStoriesController:getAllStoriesController(dependencies),

        GetMyAllStoriesForHighLighController:GetMyAllStoriesForHighLighController(dependencies)
    }
}