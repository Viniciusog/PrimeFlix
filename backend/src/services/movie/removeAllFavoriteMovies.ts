import { FastifyRequest } from "fastify";
import { adminAuth, firestore } from "../../firebase/firebase-config";
import { USER_COLLECTION } from "../../utils/Constants";

async function removeAllFavoriteMovies(req: FastifyRequest): Promise<void> {
    const accessToken = req.headers.authorization?.replace("Bearer ", "") || ""
    const uid = (await adminAuth.verifyIdToken(accessToken)).uid
    const userRef = firestore.collection(USER_COLLECTION).doc(uid);
    
    await userRef.update({
        favoriteMoviesIds: []
    })
}

export { removeAllFavoriteMovies }