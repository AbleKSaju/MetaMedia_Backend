import {kafka} from '../../config/kafkaClient'
import { createUserController } from '../adapters/consumeController/userController'
// import { userController } from '../adapters/consumeController'
// import {createUser} from './consumerhandler'

const consumer=kafka.consumer({groupId:"user-service"})

export const userconsumer = async(dependencies:any)=>{
    try {
        await consumer.connect()
        await consumer.subscribe({topic:"authTopic",fromBeginning:true})
        await consumer.run({
            eachMessage:async({message})=>{
                const bynerydata:any=message.value
                const jsonstring:string=bynerydata?.toString()
                const jsondata=JSON.parse(jsonstring)
                const messagetype=jsondata?.type
                if(messagetype == 'createUser'){
                    await createUserController(dependencies,jsondata.data)
                }
            }
        })
        
    } catch (error) {
        console.log('Error in auth consumer',error);
        
    }
}