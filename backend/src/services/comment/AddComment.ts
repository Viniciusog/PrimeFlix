import { adminAuth, firestore } from "../../firebase/firebase-config";
import { MovieComment } from "../../entities/MovieComment";
import { MOVIE_COLLECTION, COMMENT_COLLECTION, USER_COLLECTION } from "../../utils/Constants";

async function addComment(movieId: number, comment: MovieComment):Promise<MovieComment> {
    if(!movieId){
        throw new Error("ID do filme precisa ser informado.")
    }
    const commentCollection = firestore.collection(`${MOVIE_COLLECTION}/${movieId.toString()}/${COMMENT_COLLECTION}`)
    const commentRef = await commentCollection.add({content: comment.getContent(),  date: comment.getDate(), userEmail: comment.getUserEmail()})

    const uid = (await adminAuth.getUserByEmail(comment.getUserEmail())).uid

    const userData = (await firestore.collection(`${USER_COLLECTION}`).doc(uid).get()).data()
    comment.setId(commentRef.id)
    
    if (userData) {
        comment.setUserName(userData.name)
    }

    comment.setLikes(0)
    comment.setLikedByCurrentUser(false)

    return comment;
}

export { addComment }