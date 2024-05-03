import AddStoryController from "./addStoryController";
import deleteStoryController from "./deleteStoryController";
import getStoriesController from "./getStoriesController";
import getAllStoriesController from "./getAllStoriesController";
import GetMyAllStoriesForHighLighController from "./getMyAllStoriesForHighLighController";
import addVideoController from "./addVideoController";
import getSignatureController from "./getSignatureController";
import getTheNumberOfStoriesController from "./getTheNumberOfStoriesController";
;

export default (dependencies:any)=>{

    return{
        AddStoryController:AddStoryController(dependencies),

        AddVideoController:addVideoController(dependencies),

        getSignatureController:getSignatureController(dependencies),

        DeleteStoryController:deleteStoryController(dependencies),

        getStoriesController:getStoriesController(dependencies),

        getAllStoriesController:getAllStoriesController(dependencies),

        GetMyAllStoriesForHighLighController:GetMyAllStoriesForHighLighController(dependencies),

        getTheNumberOfStoriesController:getTheNumberOfStoriesController(dependencies)
    }
}