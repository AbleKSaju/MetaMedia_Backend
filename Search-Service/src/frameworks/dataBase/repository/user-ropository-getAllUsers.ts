
import elasticClient from '../elastic/elasticClient';
export default {
    
    getAllUsers: async () => {
        try {
          const response = await elasticClient.search({
            index: "search-user",
            body: {
              query: {
                match_all: {}
              }
            }
          });

          console.log('this is sressponce',response.hits);
          
    
          if (response && response.hits.total.value > 0) {
            const users = response.hits.hits.map((hit:any) => hit._source);
            return { status: true, data: users };
          } else {
            return { status: false, message: "No users found" };
          }
        } catch (error) {
          console.error("Error while getting all users:", error);
          return { status: false, message: "Error while getting all users" };
        }
      }
    
};
