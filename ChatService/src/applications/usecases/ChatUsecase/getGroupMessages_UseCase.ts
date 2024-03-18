export const getGroupMessages_useCase = (dependencies: any) => {
    const {
      repository: { chatRepository },
    } = dependencies;
  
    const executeFunction = async (groupId:string) => {
      const response = await chatRepository.getGroupMessages(groupId);

      
      if (response.status) {
        return { status: response.status, data:response.data };
      }else{

          return { status: false, message: response.message};
      }
    };
    return { executeFunction };
  };
  