import create_user_controller from './create.user.controller'

export default (dependencies:any)=>{
    return {
        createUserController:create_user_controller(dependencies)
    }
}