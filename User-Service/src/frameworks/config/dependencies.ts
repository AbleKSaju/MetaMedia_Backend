import {userRepository,profileRepository} from '../../adapters/repositories'
import {addProfileUsecase,editUserUsecase,AddProfileImageUsecase} from '../../applications/usecases'
import {createUserUsecase} from'../../applications/consumeUsecases'
import { getUserData_Usecase, chooseInterest_Usecase,getAllUsers_usecasse,getUsersById_Usecase,getUsersByName_Usecase,getUsersDataById_Usecase} from '../../applications/usecases/user'


const useCase:any={
    addProfileUsecase,
    chooseInterest_Usecase,
    editUserUsecase,
    AddProfileImageUsecase,
    getUserData_Usecase,
    getAllUsers_usecasse,
    getUsersById_Usecase,
    getUsersByName_Usecase,
    getUsersDataById_Usecase
    
}

const consumeUsecase:any={
    createUserUsecase
}

const repository:any={
    userRepository,
    profileRepository
}

export default {
    useCase,repository,consumeUsecase
}