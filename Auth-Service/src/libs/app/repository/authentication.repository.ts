import schema from "../database/schema";
export default {
  userEmailExist: async (email: string) => {
    try {
      const responce = await schema.User.findOne({
        "basicInformation.email": email,
      });
      return responce;
    } catch (error) {
      console.log(
        "error in repositery authencation repo in userEmailexist",
        error
      );
    }
  },

  createUser: async (data: any) => {
    const userData = {
      "basicInformation.fullName": data.name,
      "profile.profileUrl": data.profile,
      "basicInformation.email": data.email,
      "basicInformation.password": data.password,
      "basicInformation.isGoogle": data.isGoogle,
      "basicInformation.isFacebook": data.isFacebook,
    };
    const response = await schema.User.create(userData);
    if (response) {
      return { status: true, message: "user created sucessfull", response };
    } else {
      return { status: false, message: "user cretion failed" };
    }
  },
  finduser: async (email: string) => {
    try {
      const finduser = await schema.User.findOne({
        "basicInformation.email": email,
      });
      if (finduser) {
        return { status: true, user: finduser };
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log(
        "error in repositery authencation repo in userEmailexist",
        error
      );
    }
  },
  changePassword: async (email: string, hashedPassword: string) => {
    const passwordChange = await schema.User.findOneAndUpdate(
      { "basicInformation.email": email },
      { $set: { "basicInformation.password": hashedPassword } },
      { new: true }
    );
    if (passwordChange) {
      return { status: true, message: "Password Changed" };
    } else {
      return { status: false, message: "Not changed" };
    }
  },

  createInterest: async (data: any, email: string) => {
    try {
      console.log(email,"email");
      console.log(data,"data");
      
      const createInterest = await schema.User.findOneAndUpdate(
        { "basicInformation.email": email },
        { $push: { "profile.interests": { $each: data } } },
        { new: true }
      );
      console.log(createInterest,"BBBB");
      
      if (createInterest) {
        return { status: true, message: "Interest added" };
      }
      return { status: false, message: "Internal error" };
    } catch (error) {
      return error;
    }
  },

  //  verifyPassword:async(email,password:string)=>{
  //     try {
  //         const userData=await schema.User.findOne({email})
  //         if(userData)
  //     } catch (error) {
  //         console.log('error in repositery authencation repo in userEmailexist',error);
  //     }

  //  }
};
