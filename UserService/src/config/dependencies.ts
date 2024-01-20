import  {authenticationRepository} from '../libs/app/repository/index'
import {createUser_Usecases} from '../libs/usecases'


const useCase:any={
  createUser_Usecases
}

const repository:any={
    authenticationRepository
}
export default {
    useCase,repository
}