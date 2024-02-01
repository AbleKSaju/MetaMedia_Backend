import dependencies from "../../../config/dependencies"
import addProfileController from "./addProfileController"

export default (dependencies:any)=>{
    return{
        addProfileController:addProfileController(dependencies)
    }
}