import {kafka} from '../../../config/kafka-client'
import controllers from '../controllers'



const consumer=kafka.consumer({groupId:"search-service"})

export const searchConsumer = async(dependencies:any)=>{
    const {createUserConsumer}=controllers(dependencies)
    try {
        await consumer.connect()
        await consumer.subscribe({topic:"search-topic",fromBeginning:true})
        await consumer.run({
            eachMessage:async({message})=>{
                const bynerydata:any=message.value
                const jsonstring:string=bynerydata?.toString()
                const jsondata=JSON.parse(jsonstring)
                const messagetype=jsondata?.type
               
                console.log(jsondata,'this is kafaka consumer data');


                if(messagetype=='create-search-user'){

                    const data= {
                        _id:jsondata.data.userId,
                        name:jsondata.data.userName,
                        profileUrl:jsondata.data.profileUrl,
                        followers:jsondata.data.followers,
                        following:jsondata.data.following,
                        blockedUsers:jsondata.data.blockedUsers
                    }

                    // const responce:any =await createUserConsumer(data)

                    // if(responce.status){

                       
                    //     await consumer.disconnect()
                    // }else{
                    //     console.log('this is rsoce fails',responce?.message);
                    //     await consumer.disconnect()
                    // }

                }

            
                
            }
        })
        
    } catch (error) {
        console.log('Error in search consumer',error);
        
    }
}