import schema from "../database/schema"

export default {
    
  addProfile: async (data: any, id: string) => {
    console.log(id,"USerID from add profile");
    
    const response = await schema.User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          'basicInformation.userName': data.username,
          'basicInformation.phoneNumber': data.mobile,
          'basicInformation.dateOfBirth': data.dob,
          'basicInformation.gender': data.gender,
          'profile.bio': data.bio,
          // 'profile.profileUrl': data.image,
          'profile.location': data.location,
        },
      },
      { new: true }
    );
    console.log(response,"DAta");
    

    if (response) {
      return { status: true, message: "Profile created successfully" };
    } else {
      return { status: false, message: "User creation failed" };
    }
  },
};
