
import { UserIndexMapping } from '../../../entities/user-mapping-interface';

const userMapping: UserIndexMapping = {
    mappings: {
        properties: {
            userId: {
                type: 'keyword'
            },
            userName: {
                type: "text"
              },
              profileUrl: {
                type: "text"
              },
              followers: {
                type: "nested",
                properties: {
                  followerId: {
                    type: "keyword"
                  }
                }
              },
              following: {
                type: "nested",
                properties: {
                  followingId: {
                    type: "keyword"
                  }
                }
              },
            blockedUsers: {
                type: "nested",
                properties: {
                  blockedUserId: {
                    type: "keyword"
                  }
                }
              }
        }
    }
};

export default userMapping;

