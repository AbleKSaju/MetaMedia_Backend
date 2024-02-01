import {authenticationRepository} from '../libs/app/repository'

export const addUser=async(data:any)=>{

const {createUser}=authenticationRepository

await createUser(data)





}