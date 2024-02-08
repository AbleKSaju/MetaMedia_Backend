import {sayHelloRepo} from '../../adapters/repositories'
import {sayHello_usecase} from '../../applications/useCases'


const useCase:any={
    sayHello_usecase
}
const repositery:any={
    sayHelloRepo
}


export default {
    useCase,repositery
}