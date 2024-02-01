import {loginUser_usecases,addProfile_Usecase} from '../libs/usecases'
import {authenticationRepository,profileRepository} from '../libs/app/repository'


const useCase:any={
    loginUser_usecases,
    addProfile_Usecase   
}

const repository:any={
    authenticationRepository,
    profileRepository
}


export default {
    useCase,repository
}