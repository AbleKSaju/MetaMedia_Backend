export const decodeDataFromHeaders = (headers: any) => {
  const { decodedTokenData } = headers;
    if (decodedTokenData.user.status) {
    const userId = decodedTokenData?.user?.user?._id;
    return userId
  }else{
    return {status:false , message:"user Not Exist"}
  }
};
