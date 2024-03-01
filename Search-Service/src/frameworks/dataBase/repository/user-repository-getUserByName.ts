import elasticClient from '../elastic/elasticClient';
export default {
    
  getUserByName: async (name: string) => {
  try {
    const response = await elasticClient.search({
      index: "search-user",
      body: {
        query: {
          match: {
            userName: name
          }
        }
      }
    });

    console.log('this is responce',response);
    
    if (response && response.body && response.body.hits.total.value > 0) {
      return { status: true, data: response.body.hits.hits[0]._source };
    } else {
      return { status: false, message: "User not found" };
    }
  } catch (error) {
    console.error("Error while searching for user by name:", error);
    return { status: false, message: "Error while searching for user by name" };
  }
}
};
