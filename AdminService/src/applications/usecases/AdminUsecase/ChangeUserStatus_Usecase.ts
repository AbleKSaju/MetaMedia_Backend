export const ChangeUserStatus_Usecase = (dependencies: any) => {
  const {repository: { adminRepository },} = dependencies;

  const executeFunction = async (userId:string) => {
    const response = await adminRepository.ChangeUserStatus(userId);
    if (response) {
      return { status: response.status, message: response.message };
    }
    return { status: false, message: "Highlight error" };
  };
  return { executeFunction };
};
