import create_user_controller from './create.user.controller'
import verifyOtpController from './verifyOtp.controller'

export default (dependencies:any)=>{
    return {
        createUserController:create_user_controller(dependencies),
        verifyOtpController:verifyOtpController()
    }
}