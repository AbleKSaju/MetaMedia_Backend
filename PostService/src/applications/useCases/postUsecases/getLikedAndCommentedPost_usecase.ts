export const getLikedAndCommentedPost_usecase = (dependencies: any) => {
    const { getLikedAndCommentedPost } = dependencies.repositery.getLikedAndCommentedPost;
    const executeFunction = async (userId: any) => {
      try {
        const response = await getLikedAndCommentedPost(userId);  
        if (response.status) {
          return { status: true, post: response.post, comment: response.comment ,saved:response.saved};
        } else {
          return { status: false, message: "No Likes found for the user" };
        }
      } catch (error) {
        return { status: false, message: "An error occurred while executing the Api" };
      }
    };
  
    return { executeFunction };
  };
  