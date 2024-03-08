
import {userCreateRepo,userRepositoryGetUserByName,userRopositoryGetAllUsers,userRepositoryDeleteUserByName} from '../dataBase'
import {createUser_useCase,getUserByName_useCase,getAllusers_useCase,createNewUser_useCase,deletUserByName_useCase} from '../../applications/useCases'

const useCase:any={
    createUser_useCase,
    getUserByName_useCase,
    getAllusers_useCase,
    createNewUser_useCase,
    deletUserByName_useCase
}
const repositery:any={
    userCreateRepo,
    userRopositoryGetAllUsers,
    userRepositoryGetUserByName,
    userRepositoryDeleteUserByName
}



export default {
    useCase,repositery
}