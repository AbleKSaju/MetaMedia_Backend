import { userMapping } from "../index";
import { createIndex } from "../elastic/user-index";
import elasticClient from "../elastic/elasticClient";

export default {
  createUser: async (data: any) => {
    console.log(data, "userdata----------- from the reposory");

    
   
    const { userId, userName, profileUrl, followers, following, blockedUsers } = data;
    const response = await elasticClient.index({
      index: "search-user",
      body: {
        userId,
        userName,
        profileUrl,
        followers,
        following,
        blockedUsers,
      },
      refresh: true,
      ...userMapping
    });
    console.log(response,'this is respoce ');
    

    if (response && response.result === "created") {
      console.log('hhiiiiiiiiiiiiiii');
      
      return { status: true, data: "user Creted created successfully" };
    } else {
      return { status: false, message: "User creation failed" };
    }
  },
};
