import schema from '../database/schema'

export default {

    createUser:async(data:any)=>{
        try {
            const userData = {
                "basicInformation.userId": data._id,
                "basicInformation.fullName": data.name,
                "profile.profileUrl": data.profile,
                "basicInformation.email": data.email,
                "basicInformation.isGoogle": data.isGoogle,
                "basicInformation.isFacebook": data.isFacebook,
              };
            const response =await schema.User.create(userData)
            console.log(response,"rees");
              
            if (response) {
                return { status: true, message: "user created sucessfull", response };
              } else {
                return { status: false, message: "user cretion failed" };
              }
        } catch (error) {
            console.log('Error in the cretae user in the auth service / repositery ',error);
        }
    },

    createInterest: async (data: any, id: string) => {
        try {
            console.log(id,"iddd");
          const createInterest = await schema.User.findOneAndUpdate(
            { 'basicInformation.userId': id },
            { $set: { "profile.interests": data } });   
            console.log(createInterest,"SUCCESS");
          if (createInterest) {
            return { status: true, message: "Interest added" };
          }
          return { status: false, message: "Internal error" };
        } catch (error) {          
          return error;
        }
      },

    finduser:async(email:string)=>{
        try {
            const  finduser=await schema.User.findOne({email})
            if(finduser){

                return ({status:true,finduser})
            }else{
                return {status:false}
            }
        } catch (error) {
            console.log('error in repositery authencation repo in userEmailexist',error);
        }
     },
}