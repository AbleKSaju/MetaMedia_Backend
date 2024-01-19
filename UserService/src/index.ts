
import {dbconnect} from './config/dbconnect'
import {app} from  './app'
const PORT= process.env.PORT || 3000
const start=async()=>{
    try {
        await dbconnect()
    } catch (error) {
        console.log('error in src/index.ts in the start funtion',error);
        
    }
  app.listen(PORT,()=>console.log('server is running in ',PORT)
  )
}

start()