import { firestore } from "../../firebase/firebase-config";
import { COMMENT_COLLECTION, MOVIE_COLLECTION,LIKES_COLLECTION } from "../../utils/Constants";

async function dislikeComment(movieId: number, commentId: string, userEmail: string): Promise<void> {
    const likeRef = firestore.collection(`${MOVIE_COLLECTION}/${movieId}/${COMMENT_COLLECTION}/${commentId}/${LIKES_COLLECTION}`).doc(userEmail)
    await likeRef.delete()
}

export { dislikeComment }