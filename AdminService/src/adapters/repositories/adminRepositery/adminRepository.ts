import schema from "../database/schema";

export default {
  ChangeUserStatus: async (userId: string) => {
    const userExist = await schema.Highlight.findOneAndUpdate({ userId: userId });

    if (!userExist) {
      const highlightData = {
        userId: userId,
        highlights: [],
      };
      const response = await schema.Highlight.create(highlightData);
      if (!response) {
        return { status: false, message: "user creation failed", user: false };
      }
    }
  }

  getHighlights: async (userId:string) => {
    const userExist = await schema.Highlight.findOne({userId:userId});
    
    if (userExist) {
      return { status: true, message: "Highlights found", data: userExist };
    } else {
      return { status: false, message: "user not found", data: false };
    }
  },

  deleteHighlight: async (userId: string, name: string, image: string) => {
    const response: any = await schema.Highlight.findOneAndUpdate(
      { userId: userId, "highlights.name": name },
      { $pull: { "highlights.$.media": image } },
      { new: true } 
    );    

    if (response) {
      const highlight = response.highlights.find((highlight: any) => highlight.name === name);
      if (highlight && highlight.media.length === 0) {        
        const data: any = await schema.Highlight.findOneAndUpdate(
          { userId: userId },
          { $pull: { highlights: { name: name } } }
        );
      }
    }
    if (response) {
      return { status: true, message: "Highlight deleted" };
    } else {
      return { status: false, message: "Highlght not found" };
    }
}
};
