import { firestore } from "../../firebase/firebase-config";
import { COMMENT_COLLECTION, MOVIE_COLLECTION,LIKES_COLLECTION } from "../../utils/Constants";

async function likeComment(movieId: number, commentId: string, userEmail: string): Promise<void> {
    const likeCollection = firestore.collection(`${MOVIE_COLLECTION}/${movieId}/${COMMENT_COLLECTION}/${commentId}/Likes`)
    const result = await likeCollection.doc(userEmail).set({})
    console.log(result)
}

export { likeComment }