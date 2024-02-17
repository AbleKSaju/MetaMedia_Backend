export const addNewHighlight_Usecase = (dependencies: any) => {
  const {
    repository: { highlightRepository },
  } = dependencies;

  const executeFunction = async (userId:string,name: string, selectedImage: string[]) => {
    console.log(selectedImage, "data from useCase");
    const response = await highlightRepository.addNewHighlightData(userId,name,selectedImage);
    if (response) {
      return { status: response.status, message: response.message };
    }
    return { status: false, message: "Highlight error" };
  };
  return { executeFunction };
};
