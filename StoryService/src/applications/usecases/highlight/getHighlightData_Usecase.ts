export const GetHighlightData_Usecase = (dependencies: any) => {
    const {
      repository: { highlightRepository },
    } = dependencies;
  
    const executeFunction = async (userId:string) => {
    //   console.log(selectedImage, "data from useCase");
      const response = await highlightRepository.getHighlights(userId);
      console.log(response,"res from exe");
      
      if (response) {
        return { status: response.status, message: response.message, data:response.data };
      }
      return { status: false, message: "Highlight error", data:false };
    };
    return { executeFunction };
  };
  