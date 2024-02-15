import AddStoryController from "./addStoryController";
import deleteStoryController from "./deleteStoryController";

export default (dependencies:any)=>{
    return{
        AddStoryController:AddStoryController(dependencies),
        DeleteStoryController:deleteStoryController(dependencies)
    }
}