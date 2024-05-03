import schema from '../Database/schema'

export default {
  findUser: async (userId: any) => {
    try {
      console.log(userId, "userId");

      const response = await schema.Story.findOne({userId:userId });
      console.log(response,"responseresponseresponse");
      if (response) {
        return { status: true, message: "user exist", user: response };
      } else {
        return { status: false, message: "user not found", user: false };
      }
    } catch (error) {
      console.log(error, "ER");
      return { error };
    }
  },

  createUser: async (data: any) => {
    const { userId,profile } = data;
    const storyData = {
      userId:userId ,
    }
    const response = await schema.Story.create(storyData);    
    console.log(response,"ma.Story.create(storyD");
    
    if (response) {
      return { status: true, message: "User created", story: response };
    } else {
      return { status: false, message: "Not created", story: false };
    }
  },

  addStory: async (data: any) => {
    const { userId, caption, imageUrl, profile } = data;
    console.log(imageUrl,"imageUrlimageUrlimageUrlimageUrl");
    
    const response = await schema.Story.findOneAndUpdate(
      { userId: userId },
      {
        profile: profile,
        $push: {
          'content.story': {
            caption: caption,
            type: "image",
            storyUrl: imageUrl,
          },
        },
      },
      { new: true }
    );
    console.log(response,"responseresponseresponse");
    
    if (response) {
      return { status: true, message: "story created" };
    } else {
      return { status: false, message: "Not created" };
    }
  },

  getStories: async (userId: any) => {
    try {  
      const response:any = await schema.Story.findOne({ userId: userId, 'content.story': { $elemMatch: { status: true } } });  
      if (response) {
        const filteredStories = response?.content?.story?.filter((story:any) => story.status === true);        
        return { status: true, message: "Stories found", data: filteredStories };
      } else {
        console.log("I AM ELSEEEE");
        return { status: false, message: "stories not found", data: false };
      }
    } catch (error) {
      console.log(error, "ER");
      return { error };
    }
  },

  getTheNumberOfStories: async () => {
    try {  
      const response:any = await schema.Story.find({'content.story': { $elemMatch: { status: true } } }).countDocuments();  
      console.log(response,"responseresponseresponseresponseresponse");
        // const filteredStories = response?.content?.story?.filter((story:any) => story.status === true); 
        return { status: true, message: "Stories found", data: response };
    } catch (error) {
      return { error };
    }
  },

  getAllStories: async (userId:string) => {
    try {      
      const allStories = await schema.Story.find({ userId: { $ne: userId } });

      
      if (allStories) {
        const userStoriesMap:any = {};
        allStories.forEach(story => {
          const userId:any = story.userId;
          if (!userStoriesMap[userId]) {
            userStoriesMap[userId] = [];
          }
          userStoriesMap[userId].push(story);
        });
       let userIdCounter = 0;
        const result:any = [];
        for (const userId in userStoriesMap) {
          const userStories = userStoriesMap[userId];
          const profile:any = userStories[0]?.profile;    
          console.log(profile,"profileUrL");
                
          const filteredStories:any = userStories[0]?.content?.story?.filter((story:any) => story.status == true );          
          if(filteredStories.length){
            result[userIdCounter++] = {
              userId:userId,
              status: true,
              data: filteredStories,
              profile:profile
            };
          }
        }       
         
  if(result){
    return { status: true, message: "stories found", data: result };
  }else{
    return { status: false, message: "stories not found", data: false};
  }
      } else {
        return { status: false, message: "No stories found" };
      }
    } catch (error) {
      console.log(error, "Error");
      return { status: false, message: "An error occurred" };
    }
  },
  

  deleteStory: async (userId:string,storyId:string)=>{
    console.log(storyId,"storyIdstoryId");
    const response:any = await schema.Story.findOneAndUpdate(
      { userId: userId },
      {
        $pull: {
          'content.story': {
            _id:storyId,
          },
        },
      },
      { new: true }
    );
    
    if (response) {
      // const filteredStories = response?.content?.story?.filter(story => story.status === true);

      return { status: true, message: "story Removed"};
    } else {
      return { status: false, message: "Story Crashed"};
    }
  },

  getMyAllStoriesForHighlight: async (userId: any) => {
    
    try {  
      const response:any = await schema.Story.findOne({ userId: userId }); 
      console.log( response.content.story," response.content.story");
       
      if (response && response.content && response.content.story) {
        const extractedData = response.content.story.map((story: any) => {
          console.log(story,"story,story");
          
            return {
                storyUrl: story.storyUrl,
                id: story._id,
                type: story.type
            };
        });

        if(extractedData.length){
          return { status: true, message: "stories found", data: extractedData };
        }
          return { status: false, message: "stories not found", data: false};
      }

    } catch (error) {
      console.log(error, "ER");
      return { error };
    }
  }
};
