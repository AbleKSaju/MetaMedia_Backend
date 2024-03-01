
import {userCreateRepo,userRepositoryGetUserByName,userRopositoryGetAllUsers} from '../dataBase'
import {createUser_useCase,getUserByName_useCase,getAllusers_useCase} from '../../applications/useCases'

const useCase:any={
    createUser_useCase,
    getUserByName_useCase,
    getAllusers_useCase
}
const repositery:any={
    userCreateRepo,
    userRopositoryGetAllUsers,
    userRepositoryGetUserByName

}



export default {
    useCase,repositery
}