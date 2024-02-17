import schema from "../database/schema";

export default {

  addNewHighlightData: async (
    userId: string,
    name: string,
    selectedImages: any
  ) => {

    const userExist = await schema.Highlight.findOne({ userId: userId });

    if (!userExist) {
        const highlightData = {
            userId: userId,
            highlights: []
        };
        const response = await schema.Highlight.create(highlightData);
        if (!response) {
            return { status: false, message: "user creation failed", user: false };
        }
    }

    const nameExist = await schema.Highlight.findOne({ userId: userId, 'highlights.name': name });    
    if (!nameExist) {
        const updatedDocument = await schema.Highlight.findOneAndUpdate(
            { userId: userId },
            { $push: { highlights: { name: name } } },
            { new: true }
        );
        if (!updatedDocument) {
            return { status: false, message: "user update failed", user: false };
        }        
    }

    let imagesToUpdate:any =[] 
     await selectedImages.map((image:any) => {
        imagesToUpdate.push(image.imgUrl)
    });    
    
    const response = await schema.Highlight.findOneAndUpdate(
        { userId: userId, 'highlights.name': name },
        { $push: { 'highlights.$.media': { $each: imagesToUpdate } } },
        { new: true }
    );
    
    console.log(response, "CREATED");
    

    if (response) {
      return { status: true, message: "Highlight Added" };
    } else {
      return { status: false, message: "Highlght not added" };
    }
  },

  getHighlights: async (userId:string)=>{
    const userExist = await schema.Highlight.findOne({ userId: userId });
    if(userExist){
        return { status: true, message: "Highlights found", data:userExist };
    } else {
      return { status: false, message: "user not found", data:false };
    }
  }
};
