// services/ratings/getAverageRating.ts

import { firestore } from "../../firebase/firebase-config";
import { MOVIE_COLLECTION, RATING_COLLECTION } from "../../utils/Constants";

export interface AverageRatingResponse {
    average: number;
    totalRatings: number;
}

export async function getAverageRating(movieId: number, canThrowError: boolean = true): Promise<AverageRatingResponse> {
    if (!movieId) {
        throw new Error("ID do filme precisa ser informado");
    }

    const ratingCollection = firestore.collection(`${MOVIE_COLLECTION}/${movieId.toString()}/${RATING_COLLECTION}`);
    const ratingsSnapshot = await ratingCollection.get();
    
    if (ratingsSnapshot.size == 0) {    
        if (!canThrowError) {
            const obj: AverageRatingResponse = {
                average: 0,
                totalRatings: 0
            }
            return obj
        }
        throw new Error("Nenhuma avaliação encontrada para o filme especificado");
    }

    let totalHearts = 0;
    let totalRatings = ratingsSnapshot.size;

    ratingsSnapshot.forEach(doc => {
        const ratingData = doc.data();
        totalHearts += ratingData.hearts;
    });

    const response: AverageRatingResponse = {
        average: (totalHearts / totalRatings),
        totalRatings: totalRatings,
    }
    return response;
}
