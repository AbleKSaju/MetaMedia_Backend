export const getAllPostOfUser_useCase = (dependencies: any) => {
    const { getallpostofuser } = dependencies.repositery.getAllPostOfUser;
  
    const executeFunction = async (userId: any) => {
      try {

        const response = await getallpostofuser(userId);
  console.log(response,"responsegetallpostofuser");
  
        if (response.status) {
          return { status: true, data: response.data, tagged:response.tagged };
        } else {
          return { status: false, message: "No posts found for the user" };
        }
      } catch (error) {
        console.error('Error from the getAllPostOfUser use case execute function:', error);
        return { status: false, message: "An error occurred while executing the use case" };
      }
    };
  
    return { executeFunction };
  };
  