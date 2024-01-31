import {kafka} from '../config/kafkaClient'
const producer =kafka.producer()


export const authProducer=async(sendData:any,topic:any,type:any)=>{
  
    try {
        
        if(!sendData){
            throw new Error('send data not existed')
            
        }else{

            await producer.connect()

            const messagepayload={
                type:type,
                data:sendData
            }

            const result : any=await producer.send({
                topic:topic,
                messages:[{value:JSON.stringify(messagepayload)}]
            })

            if (result && result[0] && result[0]?.error) {
                throw new Error('Message production failed')
            }





        }


    } catch (error) {
        console.log('Error in the auth producer',error);
        
    }finally{
        await producer.disconnect()
    }


}