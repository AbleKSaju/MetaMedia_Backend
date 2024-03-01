export interface UserIndexMapping {
    mappings: {
        properties: {
            userId: {
                type: string;
            };
            userName: {
                type: string;
            };
            profileUrl: {
                type: string;
            };
            followers: {
                type: string;
                properties: {
                    followerId: {
                        type: string;
                    };
                };
            };
            following: {
                type: string;
                properties: {
                    followingId: {
                        type: string;
                    };
                };
            };
            blockedUsers: {
                type: string;
                properties: {
                    blockedUserId: {
                        type: string;
                    };
                };
            };
        };
    };
}