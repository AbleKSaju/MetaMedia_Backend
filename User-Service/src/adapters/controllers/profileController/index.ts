import addProfileController from "./addProfileController"
import editProfileController from "./editProfileController"
import addProfileImageController from "./addProfileImageController"

export default (dependencies:any)=>{
    return{
        addProfileController:addProfileController(dependencies),
        editProfileController:editProfileController(dependencies),
        addProfileImageController:addProfileImageController(dependencies)
    }
}