import schema from "../database/schema"

export default {
    
  addProfile: async (data: any, email: string) => {
    const response = await schema.User.findOne(
      { 'basicInformation.email': email },
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

// export default {
//     addProfile:async(data:any , id:string)=>{
//             const response = await schema.User.updateOne({_id:id},
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
