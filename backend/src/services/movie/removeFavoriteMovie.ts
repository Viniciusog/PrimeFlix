import { FastifyRequest } from "fastify";
import { adminAuth, firestore } from "../../firebase/firebase-config";
import { USER_COLLECTION } from "../../utils/Constants";

async function removeFavoriteMovie(req: FastifyRequest, movieId: number): Promise<void> {
    if (!movieId) {
        throw new Error("É necessário informar o id do filme para remover da lista de favoritos.")
    }
    const accessToken = req.headers.authorization?.replace("Bearer ", "") || ""
    const uid = (await adminAuth.verifyIdToken(accessToken)).uid
    const userRef = firestore.collection(USER_COLLECTION).doc(uid);
    const favoriteMovieIds = (await userRef.get()).get('favoriteMoviesIds') as any[];
    
    if (!favoriteMovieIds.includes(Number(movieId))) {
        throw new Error("O filme com id " + movieId + " não está na lista de favoritos.")
    }
    
    await userRef.update({
        favoriteMoviesIds: favoriteMovieIds.filter(id => id != movieId)
    })
}

export { removeFavoriteMovie }