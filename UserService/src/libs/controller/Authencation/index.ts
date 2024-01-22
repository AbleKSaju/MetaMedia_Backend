import create_user_controller from './create.user.controller'
import verifyOtpController from './verifyOtp.controller'
import verifyPassword_Controller from './verifyPassword.controller'

export default (dependencies:any)=>{
    return {
        createUserController:create_user_controller(dependencies),
        verifyOtpController:verifyOtpController(dependencies),
        verifyPasswordController:verifyPassword_Controller(dependencies)
    }
}