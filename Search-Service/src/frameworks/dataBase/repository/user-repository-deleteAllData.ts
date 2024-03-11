import elasticClient from '../elastic/elasticClient';
export default {
    
  deleteAllUsers: async () => {
  try {
    const response = await elasticClient.deleteByQuery({
        index: "search-user",
        body: {
            query: {
                match_all: {} 
            }
        }
    });

    console.log('this is responce',response);
    
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
