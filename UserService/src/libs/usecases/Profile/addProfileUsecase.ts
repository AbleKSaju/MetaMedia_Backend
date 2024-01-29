// import React from "react";

export const addProfile_Usecase = (dependecies: any) => {
  const {repository: { profileRepository }} = dependecies;
  const executeFunction = async (data: any) => {
    const response = await profileRepository.addProfile(data.body,data.id);
    return {status:response.status,message:response.message}
  };
  return {
    executeFunction,
  };
};