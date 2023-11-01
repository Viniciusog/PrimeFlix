import { firestore } from "../../firebase/firebase-config";
import { MovieRating } from "../../entities/MovieRating";
import { MOVIE_COLLECTION, RATING_COLLECTION } from "../../utils/Constants";
import { v4 as uuidv4 } from "uuid"
import { getAverageRating } from "./getAverageRating";

export async function addRating(movieId: number, rating: MovieRating): Promise<MovieRating>{
    if (!movieId){
        throw new Error ("ID do filme precisa ser informado");
    }
    const ratingCollection = firestore.collection(`${MOVIE_COLLECTION}/${movieId.toString()}/${RATING_COLLECTION}`);
    //const ratingId:string = uuidv4();
    //rating.setId(ratingId);
    const ratingId = rating.getUserEmail()
    rating.setId(ratingId)
    await ratingCollection.doc(ratingId).set(rating.toObject())
    const movieRating = await getAverageRating(movieId)
    rating.setAverageMovieRating(movieRating)
    return rating;
}