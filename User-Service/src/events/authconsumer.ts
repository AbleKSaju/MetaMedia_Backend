import {kafka} from '../config/kafkaClient'
import {addUser} from './consumerhandler'

const consumer=kafka.consumer({
    groupId:"auth-service"
})

 




export const authconsumer = async()=>{
    try {
        await consumer.connect()
        await consumer.subscribe({topic:"auth",fromBeginning:true})
        await consumer.run({
            eachMessage:async({message})=>{
                const bynerydata:any=message.value
                const jsonstring:string=bynerydata?.toString()
                const jsondata=JSON.parse(jsonstring)
                const messagetype=jsondata?.type
                //funrther funtion are handle in here 
                if(messagetype=='add-user'){
                    await addUser(jsondata?.data)
                }

            }
        })
        
    } catch (error) {
        console.log('Error in auth consumer',error);
        
    }
}