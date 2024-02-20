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
        highlights: [],
      };
      const response = await schema.Highlight.create(highlightData);
      if (!response) {
        return { status: false, message: "user creation failed", user: false };
      }
    }

    const nameExist = await schema.Highlight.findOne({
      userId: userId,
      "highlights.name": name,
    });
    console.log(nameExist, "nameExistnameExist");

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

    let imagesToUpdate: any = [];
    await selectedImages.map((image: any) => {
      imagesToUpdate.push(image.imgUrl);
    });
    console.log(userId, name, "datas");

    const response = await schema.Highlight.findOneAndUpdate(
      { userId: userId, "highlights.name": name },
      { $push: { "highlights.$.media": { $each: imagesToUpdate } } },
      { new: true }
    );

    console.log(response, "CREATED");
    console.log(response?.highlights[0].media, "CREATEDData");

    if (response) {
      return { status: true, message: "Highlight Added" };
    } else {
      return { status: false, message: "Highlght not added" };
    }
  },

  getHighlights: async (userId: string) => {
    const userExist = await schema.Highlight.findOne({ userId: userId });
    if (userExist) {
      return { status: true, message: "Highlights found", data: userExist };
    } else {
      return { status: false, message: "user not found", data: false };
    }
  },

  deleteHighlight: async (userId: string, name: string, image: string) => {
    console.log(userId, name, image, "datas");

    const response: any = await schema.Highlight.findOneAndUpdate(
      { userId: userId, "highlights.name": name },
      { $pull: { "highlights.$.media": image } },
      { new: true } 
    );    
console.log(response,"RESP");

    if (response) {
      // Check if the media array is empty after removing the image
      const highlight = response.highlights.find((highlight: any) => highlight.name === name);
      if (highlight && highlight.media.length === 0) {
        console.log("ENTTTR");
        
        // If the media array is empty, remove the entire highlight object
        const data: any = await schema.Highlight.findOneAndUpdate(
          { userId: userId },
          { $pull: { highlights: { name: name } } }
        );
        console.log(data, "datadata");
      }

    }
    if (response) {
      return { status: true, message: "Highlight deleted" };
    } else {
      return { status: false, message: "Highlght not found" };
    }
}
};
