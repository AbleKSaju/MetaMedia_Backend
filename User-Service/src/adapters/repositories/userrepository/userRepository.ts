import User from "../database/schema"


export default {

    createUser:async(data:any)=>{
        try {
          console.log(data,"data from database");
          
            const userData = {
                "basicInformation.userId": data._id,
                "basicInformation.fullName": data.name,
                "profile.profileUrl": data.profile,
                "basicInformation.email": data.email,
                "basicInformation.isGoogle": data.isGoogle,
                "basicInformation.isFacebook": data.isFacebook,
              };
            const response =await User.create(userData)
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
          const createInterest = await User.findOneAndUpdate(
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
      console.log(email,"email from findUser");
      console.log(typeof(email),"email from findUser");
        try {
            const  finduser=await User.findOne({'basicInformation.email':email})
            console.log(finduser,"findUser");
            if(finduser){
                return ({status:true,finduser})
            }else{
                return {status:false}
            }
        } catch (error) {
            console.log('error in repositery authencation repo in userEmailexist',error);
        }
     },
     getAllUsers:async()=>{
      let usersData:any = []
      const users=await User.find()
      console.log(users,"usersusersusersusersusersusers");
      
      Promise.all(users.map(async (data:any) => {
        console.log(data,"datassssss");
        const user={
          receiverId:data.basicInformation.userId,
          email:data.basicInformation.email,
          name:data.basicInformation.fullName,
          profile:data.profile.profileUrl,
        }
        usersData.push(user)
     }))    
     console.log(usersData,"usersDatausersData");
     
      if(users){
        return { status:true,data:usersData}
      }else{
      return {status:false}
       
      }
  
    },
    getUsersByName:async(name:string)=>{
      if (name.trim() !== '') {
        const users= await User.find({ 'basicInformation.fullName': { $regex: '^' +name , $options: 'i' } })
        if(users.length > 0){
          return { status:true,data:users}
        } else {
          return {status:false}
        }
      } else {
        console.log('here kkk');
        
        return {status:false}
      }
    },

    getUserById:async(id:any)=>{
      const user=await User.findOne({'basicInformation.userId':id})
      if(user){
        return {status:true,data:user}
      }else{
        return {status:false}
      }
    },

    followUser:async(currentUserId:string , followedUserId:string)=>{
      const user:any = await User.findOne({'basicInformation.userId':currentUserId})
      // const story = await User.findOne({ userId: currentUserId }).populate('basicInformation.fullName').exec();
  
      const userAlreadyFollows = user.socialConections.following.some((connection:any) => connection.userId === followedUserId);
      console.log(userAlreadyFollows,"userAlreadyFollowsuserAlreadyFollowsuserAlreadyFollows");
      if(userAlreadyFollows){
        const updatedUser = await User.findOneAndUpdate({'basicInformation.userId':currentUserId},{$pull:{'socialConections.following': { userId: followedUserId}}})
        const updateFollowedUser = await User.findOneAndUpdate({'basicInformation.userId':followedUserId},{$pull:{'socialConections.followers': { userId: currentUserId}}})
        console.log(updatedUser," updatedUser I MA DATA");
        if(updatedUser && updateFollowedUser){
          
          return {status:true , message:"Unfollowed Success"}
        } else {
          return {status:false , message:"Failed"}
        }
      }else{
        const userDetails:any = await User.findOne({'basicInformation.userId':followedUserId})
        const updatedUser = await User.findOneAndUpdate({'basicInformation.userId': currentUserId},{  $push: { 'socialConections.following': { userId: followedUserId,profile: userDetails.profile.profileUrl, fullName: userDetails.basicInformation.fullName}}});      
        const updateFollowedUser = await User.findOneAndUpdate({'basicInformation.userId': followedUserId},{  $push: { 'socialConections.followers': { userId: currentUserId,profile: user.profile.profileUrl, fullName: user.basicInformation.fullName}}});      
        console.log(updatedUser,"updatedUserupdatedUserupdatedUserupdatedUser");
        if(updatedUser && updateFollowedUser){
          return {status:true , message:"Followed Success"}
        } else {
          return {status:false , message:"Failed"}
        }
      }
    },
    
    getUsersDataById: async(ids:any)=>{
      console.log(ids,"idsids");
      const conversationUserData = Promise.all(ids.map(async (receiverId:any) => {
        console.log(receiverId,"receiverId.idreceiverId.id");
        
        const user:any = await User.findOne({'basicInformation.userId':receiverId.id})
        console.log(user,"useruser");
        
        const userData={
          id:user?.basicInformation?.userId,
          email:user?.basicInformation?.email,
          fullName:user?.basicInformation?.fullName,
          profile:user?.profile?.profileUrl,
        }
        return { user: { receiverId: userData.id, email: userData.email, fullName: userData.fullName, profile:userData.profile }, conversationId: receiverId.conversationId }
      }))
      return {status:true , data: await conversationUserData}
    },

    getAllUsersData: async()=>{
        let usersData:any=[]
        const user:any = await User.find()
        await user.map((data:any)=>{
          console.log(data?.profile?.bio,"data?.profile?.biodata?.profile?.bio");
          
          const userData={
            id:data?.basicInformation?.userId,
            email:data?.basicInformation?.email,
            mobile:data?.basicInformation?.phoneNumber,
            fullName:data?.basicInformation?.fullName,
            profile:data?.profile?.profileUrl,
            bio:data?.profile?.bio,
            blocked:data?.profile?.blocked ?? false,
          }
          usersData.push(userData)
        })
        if(usersData){
          return { status:true, data:usersData }
        }else{
          return { status:false }
        }
      },

    getSearchUsers: async(user:string)=>{
      console.log(user,"UUUUUSSSEERRRSSSSSSS");
      
        let searchedUsers:any=[]
        const usersData:any = await User.find({
            $or: [
              {
                'basicInformation.fullName': { $regex: ".*" + user + ".*", $options: "i" },
              }, {
                'basicInformation.userName': { $regex: ".*" + user + ".*", $options: "i" },
          },
            ],
        })
        
        await usersData.map((data:any)=>{
          console.log(data.basicInformation.userName,"data.basicInformation.userNamedata.basicInformation.userNamedata.basicInformation.userName");
          
          const users={
            id:data?.basicInformation?.userId,
            email:data?.basicInformation?.email,
            fullName:data?.basicInformation?.fullName,
            userName:data.basicInformation.userName,
            profile:data?.profile?.profileUrl,
          }
          searchedUsers.push(users)
        })        
        if(searchedUsers.length){
          return { status:true, data:searchedUsers }
        }else{
          return { status:false }
        }
      },
      ChangeUserStatus: async (userId: string) => {
        const response = await User.findOneAndUpdate(
          { 'basicInformation.userId': userId },
          { $set: { 'basicInformation.blocked': { $not: '$basicInformation.blocked' } } },
          { new: true } // To return the updated document
        );    
          if (response) {
            return { status: true, message: "Status Changed" };
          }else{
            return { status: false, message: "Status Not Changed"};
          }
        }
}