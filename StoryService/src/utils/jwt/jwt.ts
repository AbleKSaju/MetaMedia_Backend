export const decodeDataFromHeaders = (headers: any) => {
  const { decodedTokenData } = headers;
  console.log(decodedTokenData?.user?.user?.basicInformation,"decodedTokenDatadecodedTokenData");
  console.log(decodedTokenData,"decodedTokenData");
  
    if (decodedTokenData.user.status) {
    const userId = decodedTokenData?.user?.user?._id;
    return userId
  }else{
    return {status:false , message:"user Not Exist"}
  }
};