

export default async(dependecies: any,data:any) => {
    console.log('hheerre');
    
  const { createUser_useCase } = dependecies.useCase;
  
    
    

    const responce=await createUser_useCase(dependecies).executeFunction(data)

    if(responce.status){
        return {status:true,data:responce.data}
    }else{
        return {status:true,message:responce.message}
    }

    

 
};




