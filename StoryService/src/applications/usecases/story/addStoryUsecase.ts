export const AddStory_useCase = (dependencies: any) => {
  const {
    repository: { storyRepository },
  } = dependencies;
  const executeFunction = async (data: any) => {
    const { userId } = data;
    console.log("ENTER TO EXECUTE");
    const userData = await storyRepository.findUser(userId);
    if (!userData.status) {
      await storyRepository.createUser(data);
    }
    const response = await storyRepository.addStory(data);
    if (response) {
      return { status: true, message: "Story added" };
    } else {
      return { status: false, message: "Story Error" };
    }
  };
  return { executeFunction };
};
