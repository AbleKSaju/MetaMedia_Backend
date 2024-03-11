
export const DeleteHighlight_Usecase = (dependencies: any) => {
    const {
      repository: { highlightRepository },
    } = dependencies;
  
    const executeFunction = async (userId:string,name: string, image: string) => {
      console.log(image, "data from useCase");
      const response = await highlightRepository.deleteHighlight(userId,name,image);
      if (response) {
        return { status: response.status, message: response.message };
      }
      return { status: false, message: "Highlight error" };
    };
    return { executeFunction };
  };
  