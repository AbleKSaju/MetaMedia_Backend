import  {authenticationRepository} from '../libs/app/repository/index'
import {createUser_Usecases,verifyOtp_Usecase,verifyPassword_Usecase,loginWithGoogle_Usecase} from '../libs/usecases'


const useCase:any={
  createUser_Usecases,
  verifyOtp_Usecase,
  verifyPassword_Usecase,
  loginWithGoogle_Usecase
}

const repository:any={
    authenticationRepository
}
export default {
    useCase,repository
}