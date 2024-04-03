import {userRepository,profileRepository,suggetionRepo} from '../../adapters/repositories'
import {addProfileUsecase,editUserUsecase,AddProfileImageUsecase} from '../../Applications/Usecases'
import {createUserUsecase} from'../../Applications/ConsumeUsecases'


import { getUserData_Usecase,BlockAndUnblockUser_Usecase,followUser_Usecase,getSearchUser_Usecase,ChangeUserStatus_Usecase, chooseInterest_Usecase,getAllUsers_usecasse,getUsersById_Usecase,getUsersByName_Usecase,getUsersDataById_Usecase,getAllUsersData_usecase,SavePost_Usecase,Suggetion_Usecase,genarateVapidKeys_useCase,subscribeToAwsSNS_useCase} from '../../Applications/Usecases'


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
    ChangeUserStatus_Usecase,
    SavePost_Usecase,
    Suggetion_Usecase,

    BlockAndUnblockUser_Usecase,

    genarateVapidKeys_useCase,
    subscribeToAwsSNS_useCase
    


}

const consumeUsecase:any={
    createUserUsecase
}

const repository:any={
    userRepository,
    profileRepository,
    suggetionRepo
}

export default {
    useCase,repository,consumeUsecase
}