export const decodeDataFromHeaders = (headers: any) => {
  const { decodedTokenData } = headers;
    if (decodedTokenData.user.status) {
    const userId = decodedTokenData?.user?.user?._id ||  decodedTokenData?.user?.response?._id;
    if(userId){
      return userId
    }
    throw new Error("user Not Exist");
  }else{
    throw new Error("user Not Exist");
    // return {status:false , message:"user Not Exist"}
  }
};
