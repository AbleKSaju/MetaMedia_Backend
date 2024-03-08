import common from "../common";
export default {
    deleteReplay: async(data: any) => {
        const { postId, commentId, replayId } = data;


        try {
            const postData:any = await common.findPostById(postId);


            if (!postData) {
                return { status: false, message: "No postData found" };
            }

            if (!postData.comments) {
                return { status: false, message: "No comments found for this post" };
            }
            const commentIndex = postData.comments.findIndex((comment: any) => comment._id == commentId);


            if (commentIndex === -1) {
                return { status: false, message: "Comment not found" };
            }
            console.log(postData.comments[commentIndex]);
            if (!postData.comments[commentIndex].replay) {
                return { status: false, message: "No replays found for this comment" };
            }

           
            
            const replayIndex = postData.comments[commentIndex].replay.findIndex((replay: any) => replay._id == replayId);

            if (replayIndex === -1) {
                return { status: false, message: "Replay not found" };
            }

            postData.comments[commentIndex].replay.splice(replayIndex, 1); 

            const updatedPost = await postData.save();

            if(updatedPost){

                return { status: true, data: updatedPost };
            }else{
                return {status:false,message:"the post is not saved"}
            }

        } catch (error) {
            console.log(error);
            
            return { status: false,message: "An error occurred" };
        }
    }
}
