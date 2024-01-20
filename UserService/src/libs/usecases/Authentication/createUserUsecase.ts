import sentOtp from "../../../nodemailer/nodemailer";
interface UserData {
  name: string;
  email: string;
  password: string;
}

export const createUser_Usecases = (dependencies: any) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  if (!authenticationRepository) {
    return console.log("Error: User Repository not found");
  }

  const executeFunction = async (data: UserData) => {
    const UserExist = await authenticationRepository.userEmailExist(data.email);
    if (UserExist) {
      return { status: false, message: "User already exist" };
    }
    const response = await sentOtp(data.email);
    if (response.status) {
      const { otp } = response;
      return { data, otp };
    } else {
      console.log("Otp sent Error");
    }
  };

  return {
    executeFunction,
  };
};
