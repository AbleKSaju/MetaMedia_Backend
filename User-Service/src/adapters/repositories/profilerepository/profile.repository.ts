import User from "../database/schema"

export default {
  addProfile: async (data: any, id: string) => {
    console.log(id, "USerID from add profile");
    const response = await User.findOneAndUpdate(
      { "basicInformation.userId": id },
      {
        $set: {
          "basicInformation.userName": data.username,
          "basicInformation.phoneNumber": data.mobile,
          "basicInformation.dateOfBirth": data.dob,
          "basicInformation.gender": data.gender,
          "profile.bio": data.bio,
          // 'profile.profileUrl': data.image,
          "profile.location": data.location,
        },
      },
      { new: true }
    );
    console.log(response, "DAta");

    if (response) {
      return { status: true, message: "Profile created successfully",user:response };
    } else {
      return { status: false, message: "User creation failed" };
    }
  },

  editUserProfile: async (data: any, id: string) => {
    console.log(id, "USerID from add profile");
    const response = await User.findOneAndUpdate(
      { "basicInformation.userId": id },
      {
        $set: {
          "basicInformation.userName": data.username,
          "basicInformation.fullName": data.fullname,
          "basicInformation.phoneNumber": data.phoneNumber,
          "basicInformation.gender": data.gender,
          "profile.bio": data.bio,
          // 'profile.profileUrl': data.image,
        },
      },
      { new: true }
    );
    console.log(response, "rsss");

    if (response) {
      return {
        status: true,
        message: "Profile edited successfully",
        user: response,
      };
    } else {
      return { status: false, message: "User editing failed", user: false };
    }
  },
  addProfileImage: async (imageUrl: string, userId: string) => {
    const response = await User.findOneAndUpdate(
      { "basicInformation.userId": userId },
      {
        $set: {
          "profile.profileUrl": imageUrl,
        },
      },
      { new: true }
    );
    if (response) {
      return {
        status: true,
        message: "Add image success",
        data: response,
      };
    } else {
      return { status: false, message: "Add image failed" };
    }
  },
};
// export default {
//     addProfile:async(data:any , id:string)=>{
//             const response = await User.updateOne({_id:id},
//                 {
//                     $set:{
//                         'basicInformation.username':data.username,
//                         'basicInformation.mobile':data.mobile,
//                         'basicInformation.bio':data.bio,
//                         'basicInformation.location':data.location,
//                         'basicInformation.dob':data.dob,
//                         'basicInformation.gender':data.gender,
//                         }
//                     },{ returnDocument: 'after' } )
//             if(response){
//                 return {status:true,message:"Profile created sucessfull"}
//             }else{
//                 return { status:false,message:"user cretion failed"}
//             }
//                 }
// }
