import User from "../database/schema";

export const getUsersByIds = async (userIds: any) => {
    try {
        const users = await User.find({ 'basicInformation.userId': { $in: userIds } });
        return users;
    } catch (error) {
        console.error("Error fetching users by IDs:", error);
        return [];
    }
}

export default {
    suggestion: async (userId: string) => {
        try {
            const depth = 2;
            const limit = 10;
            const visited = new Set();
            const suggestions = new Map(); // Map to store user suggestions and their scores

            async function dfs(currentUserId: any, currentDepth: any, score: any, followedUsers: Set<string>) {
                console.log("Visiting user:", currentUserId, "Depth:", currentDepth, "Score:", score);

                if (currentDepth > depth || visited.has(currentUserId)) {
                    return;
                }

                visited.add(currentUserId);
                const user: any = await User.findOne({ 'basicInformation.userId': currentUserId });
                console.log("User:", user);

                if (!user) {
                    console.log("User not found:", currentUserId);
                    return;
                }

                console.log("Processing user:", user.basicInformation.fullName);

                if (currentDepth !== 0 && !followedUsers.has(user.basicInformation.userId.toString())) {
                    // Update score or any other criteria you want to consider
                    if (!suggestions.has(user.basicInformation?.userId?.toString())) {
                        suggestions.set(user.basicInformation?.userId?.toString(), { user, score });
                    } else {
                        suggestions.get(user.basicInformation?.userId?.toString()).score += score;
                    }
                }

                if (currentDepth === depth) {
                    return;
                }

                const following: any = await getUsersByIds(user.socialConections.following.map((entry: any) => entry.userId));
                const followers: any = await getUsersByIds(user.socialConections.followers.map((entry: any) => entry.userId));

                console.log("Following:", following);
                console.log("Followers:", followers);

                for (const followee of following) {
                    console.log("Exploring followee:", followee.basicInformation.userId.toString());
                    await dfs(followee.basicInformation.userId.toString(), currentDepth + 1, 1, followedUsers); // Increase score for direct connections
                }

                for (const follower of followers) {
                    console.log("Exploring follower:", follower.basicInformation.userId.toString());
                    await dfs(follower.basicInformation.userId.toString(), currentDepth + 1, 0.5, followedUsers); // Decrease score for followers
                }
            }

            const followingSet = new Set<string>(); // Set to store user IDs that the current user follows
            const user: any = await User.findOne({ 'basicInformation.userId': userId });
            const followingUsers = await getUsersByIds(user.socialConections.following.map((entry: any) => entry.userId));
            followingUsers.forEach((user: any) => followingSet.add(user.basicInformation.userId.toString()));

            await dfs(userId, 0, 0, followingSet); // Pass the set of followed users to the dfs function

            const sortedSuggestions = Array.from(suggestions.values()).sort((a, b) => b.score - a.score).slice(0, limit);

            // Remove the original user from suggestions
            const filteredSuggestions = sortedSuggestions.filter(suggestion => suggestion.user._id.toString() !== userId);

            const result = filteredSuggestions.map(suggestion => suggestion.user);
            console.log(result, 'HHHHHHH');

            return { status: true, data: result };
        } catch (error) {
            console.error('Error suggesting connections:', error);
            return { status: false, message: "no suggestion", data: [] };
        }
    }
};
