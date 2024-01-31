import { hashPassword } from "../../../helper";

export const changePassword_Usecase = (dependencies: any) => {
  const {  repository: { authenticationRepository }} = dependencies;
  const executeFunction = async (email: string, password: string) => {
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);

    const response = await authenticationRepository.changePassword(
      email,
      hashedPassword
    );
    if (response) {
      return { status: response.status, message: response.message };
    } else {
      return { status: false, message: "Internal error" };
    }
  };
  return { executeFunction };
};
