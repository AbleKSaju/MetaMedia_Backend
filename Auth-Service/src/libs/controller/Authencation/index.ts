import create_user_controller from './create.user.controller'
import verifyOtpController from './verifyOtp.controller'
import verifyPassword_Controller from './verifyPassword.controller'
import loginWithGoogleController from './loginWithGoogleController'
import forgotPassword_Controller from './forgotPassword.controller'
import changePasswordController from './changePassword.controller'
import loginUserController from './loginUserController'
import loginWithFacebookController from './loginWithFacebookController'
import chooseInterestController from './chooseInterestController'
import refreshTokenController from './refreshToken.controller'
import logoutUserController from './logoutUserController'
import imageController from './imgController'

export default (dependencies:any)=>{
    return {
        createUserController:create_user_controller(dependencies),
        verifyOtpController:verifyOtpController(dependencies),
        verifyPasswordController:verifyPassword_Controller(dependencies),
        loginWithGoogleController:loginWithGoogleController(dependencies),
        loginWithFacebookController:loginWithFacebookController(dependencies),
        loginUserController:loginUserController(dependencies),
        chooseInterestController:chooseInterestController(dependencies),
        forgotPasswordController:forgotPassword_Controller(dependencies),
        changePasswordController:changePasswordController(dependencies),
        refreshTokenController:refreshTokenController(dependencies),
        logoutUserController:logoutUserController(dependencies),
        imageController:imageController(dependencies)
    }
}
