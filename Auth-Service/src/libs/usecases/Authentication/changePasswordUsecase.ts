import { hashPassword } from "../../../helper";

export const changePassword_Usecase = (dependencies: any) => {
  const {  repository: { authenticationRepository }} = dependencies;
  const executeFunction = async (email: string, password: string,oldPassword:string) => {
    const hashedPassword = await hashPassword(password);
    const response = await authenticationRepository.changePassword(email,hashedPassword,oldPassword);
    if (response) {
      return { status: response.status, message: response.message };
    } else {
      return { status: false, message: "Internal error" };
    }
  };
  return { executeFunction };
};
