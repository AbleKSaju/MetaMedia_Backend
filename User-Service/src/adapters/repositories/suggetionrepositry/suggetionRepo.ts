import UserShema from "../database/schema";

interface UserData {
    _id: string;
    basicInformation: {
        userId: string;
        userName: string;
        fullName: string;
    };
    profile: {
        profileUrl: string;
        bio: string;
    };
}

export default {
    suggestion: async (userId: string): Promise<{ status: boolean; message?: string; data: UserData[] }> => {
        try {
            // Find the user with the provided userId
            const currentUser:any = await UserShema.User.findOne({ 'basicInformation.userId': userId });

            if (!currentUser) {
              return { status: false, message: "no user found", data: [] };
            }

            // Find the user with the provided userId and exclude the current user
            const users: any[] = await UserShema.User.find({ 'basicInformation.userId': { $ne: userId } })
                .populate({
                    path: 'socialConections.following',
                    select: 'basicInformation profile socialConections.following'
                });

            let suggestedConnections: any[] = [];

            // If the user has no following, find users with the most followers
            if (currentUser.socialConections.following.length === 0) {
                const usersWithMostFollowers = await UserShema.User.find({ 'basicInformation.userId': { $ne: userId } })
                    .sort({ 'socialConections.followers.length': -1 })
                    .limit(5)
                    .select('basicInformation profile socialConections.following');
                suggestedConnections = usersWithMostFollowers;
            } else {
                // Traverse the current user's following list
                for (const followingUser of currentUser.socialConections.following) {
                    // For each following user, find their followers
                    const followingUserDocument: any = users.find(u => u._id.equals(followingUser._id));

                    if (!followingUserDocument || !followingUserDocument.socialConections.followers) {
                        continue;
                    }

                    // Iterate over the followers of the following user
                    for (const follower of followingUserDocument.socialConections.followers) {
                        // Check if the follower is not already followed by the current user
                        if (
                            !currentUser.socialConections.followers.some((userFollower: any) => userFollower._id.equals(follower._id)) &&
                            !follower._id.equals(currentUser._id) &&
                            !suggestedConnections.some((suggestedUser: any) => suggestedUser._id.equals(follower._id))
                        ) {
                            suggestedConnections.push(follower);
                        }
                    }
                }
            }

            // Limit the suggestions to 5 users
            suggestedConnections = suggestedConnections.slice(0, 5);

            return { status: true, data: suggestedConnections };
        } catch (error) {
            console.error('Error suggesting connections:', error);
            return { status: false, message: "no suggestion", data: [] };
        }
    }
};
