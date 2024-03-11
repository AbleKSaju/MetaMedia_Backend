import elasticClient from '../elastic/elasticClient';
export default {
    
  deleteUser: async (name: string) => {
  try {
    const response = await elasticClient.deleteByQuery({
        index: 'search-user',
        body: {
            query: {
                match: {
                    userName: name 
                }
            }
        }
    });

   console.log(response);
   
    
    if (response.statusCode === 200 || response.statusCode === 204) {
        return {status:true,data:response.deleted}
     } else {
         return {status:false,message:'deletion failed'}
     }
  } catch (error) {
    console.error("Error while searching for user by name:", error);
    return { status: false, message: "Error while searching for user by name" };
  }
}
};
