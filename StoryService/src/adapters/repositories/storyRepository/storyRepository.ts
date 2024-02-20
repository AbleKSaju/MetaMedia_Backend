import schema from "../database/schema";

export default {
  findUser: async (userId: any) => {
    try {
      console.log(userId, "userId");

      const response = await schema.Story.findOne({userId:userId });
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
    const { userId } = data;
    const storyData = {
      userId:userId,
    }
    const response = await schema.Story.create(storyData);
    
    if (response) {
      return { status: true, message: "User created", story: response };
    } else {
      return { status: false, message: "Not created", story: false };
    }
  },

  addStory: async (data: any) => {
    const { userId, caption, imageUrl } = data;
    console.log(userId, caption, imageUrl,"datas");
    
    const response = await schema.Story.findOneAndUpdate(
      { userId: userId },
      {
        $push: {
          'content.story': {
            caption:caption,
            type: "image",
            storyUrl: imageUrl,
          },
        },
      },
      { new: true }
    );
    
    if (response) {
      return { status: true, message: "story created" };
    } else {
      return { status: false, message: "Not created" };
    }
  },

  getStories: async (userId: any) => {
    try {
      console.log(userId, "userId");
  
      const response = await schema.Story.findOne({ userId: userId, 'content.story': { $elemMatch: { status: true } } });
  
      console.log(response, "responseStatus");
  
      if (response) {
        const filteredStories = response?.content?.story?.filter(story => story.status === true);
        return { status: true, message: "user exist", data: filteredStories };
      } else {
        return { status: false, message: "user not found", user: false };
      }
    } catch (error) {
      console.log(error, "ER");
      return { error };
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
    console.log(response.content.story,"resss");
    
    if (response) {
      // const filteredStories = response?.content?.story?.filter(story => story.status === true);

      return { status: true, message: "story Removed"};
    } else {
      return { status: false, message: "Story Crashed"};
    }
  }

};
