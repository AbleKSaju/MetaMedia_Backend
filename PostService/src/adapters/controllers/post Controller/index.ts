import sayHello_controller from "./sayHello_controller";
import addPost_controller from "./addPost_controller";
import searchLocation_controller from "./searchLocation_controller";
import getLatAndLog_controller from "./getLatAndLog_controller";
import getAllpostOfUser_controller from "./getAllpostOfUser_controller";
import showAllPost_controller from "./showAllPost_controller";
import likePost_controller from "./likePost_controller";
import addComment_controller from "./addComment_controller";
import addReplayToComment_controller from "./addReplayToComment_controller";
import deleteComment_controller from "./deleteComment_controller";
import reportPost_controller from "./reportPost_controller";
import deletePost_controller from "./deletePost_controller";
import updateComment_controller from "./updateComment_controller";
import deleteReplay_controller from "./deleteReplay_controller";
import savePost_controller from "./savePost_controller";
import getLikedAndCommentedPost_controller from "./getLikedAndCommentedPost_controller";
import changePostStatus_controller from "./changePostStatus_controller";
export default (dependencies:any)=>{
 return {

     sayHelloController:sayHello_controller(dependencies),
     addPost_controller:addPost_controller(dependencies),
     searchLocation_controller:searchLocation_controller(dependencies),
     getLatAndLog_controller:getLatAndLog_controller(dependencies),
     getAllpostOfUser_controller:getAllpostOfUser_controller(dependencies),
     showAllPost_controller:showAllPost_controller(dependencies),
     likePost_controller:likePost_controller(dependencies),
     addComment_controller:addComment_controller(dependencies),
     addReplayToComment_controller:addReplayToComment_controller(dependencies),
     deleteComment_controller:deleteComment_controller(dependencies),
     reportPost_controller:reportPost_controller(dependencies),
     deletePost_controller:deletePost_controller(dependencies),
     updateComment_controller:updateComment_controller(dependencies),
     deleteReplay_controller:deleteReplay_controller(dependencies),
     savePost_controller:savePost_controller(dependencies),
     getLikedAndCommentedPost_controller:getLikedAndCommentedPost_controller(dependencies),
     changePostStatus_controller:changePostStatus_controller(dependencies)

 }

}