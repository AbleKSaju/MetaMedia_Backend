export const getUsersById_Usecase = (dependencies: any) => {
  const { repository: { userRepository } } = dependencies;

  const executeFunction = async (id: any) => {
    const responce = await userRepository.getUserById(id);
    if (responce.status) {
      return { status: true, data: responce.data };
    } else {
      return { status: false };
    }
  };
  return {
    executeFunction,
  };
};
