
export const changeUserStatusController = async (dependencies: any, data: any) => {
    const { consumeUsecase: { ChangeUserStatus_Usecase }} = dependencies;
    const { userId , status } = data;
    await ChangeUserStatus_Usecase(dependencies).executeFunction(userId,status);
  };

