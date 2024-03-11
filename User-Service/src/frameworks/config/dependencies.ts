import {userRepository,profileRepository} from '../../adapters/repositories'
import {addProfileUsecase,editUserUsecase,AddProfileImageUsecase} from '../../applications/usecases'
import {createUserUsecase} from'../../applications/consumeUsecases'
import { getUserData_Usecase,followUser_Usecase,getSearchUser_Usecase,ChangeUserStatus_Usecase, chooseInterest_Usecase,getAllUsers_usecasse,getUsersById_Usecase,getUsersByName_Usecase,getUsersDataById_Usecase,getAllUsersData_usecase} from '../../applications/usecases'


const useCase:any={
    addProfileUsecase,
    chooseInterest_Usecase,
    editUserUsecase,
    AddProfileImageUsecase,
    getUserData_Usecase,
    getAllUsers_usecasse,
    getUsersById_Usecase,
    getUsersByName_Usecase,
    getUsersDataById_Usecase,
    getAllUsersData_usecase,
    getSearchUser_Usecase,
    followUser_Usecase,
    ChangeUserStatus_Usecase
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