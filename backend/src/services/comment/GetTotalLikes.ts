import { firestore } from "../../firebase/firebase-config";
import { COMMENT_COLLECTION, LIKES_COLLECTION, MOVIE_COLLECTION } from "../../utils/Constants";

export interface GetTotalLikesResponse {
    totalLikes: number;
}

async function getTotalLikes(movieId: number, commentId: string): Promise<GetTotalLikesResponse> {
    const commentsCollection = firestore.collection(`${MOVIE_COLLECTION}/${movieId}/${COMMENT_COLLECTION}`)
    const result = (await commentsCollection.doc(commentId).collection(LIKES_COLLECTION).get()).size
    return {totalLikes: result};
}

export { getTotalLikes }