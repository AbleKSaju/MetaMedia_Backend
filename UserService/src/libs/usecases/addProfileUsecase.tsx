import React from "react";

export const addProfile_Usecase = (dependecies: any) => {
  const {
    repository: { profileRepository },
  } = dependecies;
  const executeFunction = async (data: any) => {
    const userDetails = await profileRepository.addProfile(data);
  };
  return <div>addProfileUsecase</div>;
};
