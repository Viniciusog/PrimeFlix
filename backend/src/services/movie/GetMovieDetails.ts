import { getMovieCastAndDirectors } from "../../axios/tmdb/GetMoviePeople";
import { getMovieProviders } from "../../axios/tmdb/GetMovieProviders";
import { MovieComment } from "../../entities/MovieComment";
import { MovieDetails } from "../../entities/MovieDetails";
import { UserBase } from "../../entities/UserBase";
import { firestore } from "../../firebase/firebase-config";
import { COMMENT_COLLECTION, LIKES_COLLECTION, MOVIE_COLLECTION, RATING_COLLECTION } from "../../utils/Constants";
import { GetTotalLikesResponse, getTotalLikes } from "../comment/GetTotalLikes";
import { getAverageRating } from "../rating/getAverageRating";
import { getUserByEmail } from "../user/GetUserByEmail";

async function likedByCurrentUser(movieId: number, commentId: string, userEmail: string): Promise<boolean> {
    if (userEmail == "" || !userEmail) {
        return false;
    }
    const likesCollection = firestore.collection(`${MOVIE_COLLECTION}/${movieId}/${COMMENT_COLLECTION}/${commentId}/Likes`)
   
    let result: boolean = false;
    const doc = await likesCollection.doc(userEmail).get()

    if (doc.exists) {
        result = true;
    } 
    return result;
}

export async function getCurrentUserMovieRating(movieId: number, userEmail: string): Promise<number> {    
    let currentUserRating;
    if (!userEmail || !userEmail.trim() || movieId == undefined) {
        return currentUserRating;
    }

    const doc = await firestore.collection(`${MOVIE_COLLECTION}/${movieId.toString()}/${RATING_COLLECTION}`)
    .doc(userEmail).get();

    if (doc.exists) {
        currentUserRating = doc.data()?.hearts;
    }
    return currentUserRating;
}


async function getMovieDetails(movieId: number, currentUserEmail: string) {

    const commentsColletion = firestore.collection(`${MOVIE_COLLECTION}/${movieId}/${COMMENT_COLLECTION}`)
    
    const [commentsResult, averageResult, peopleResult, movieProviders, currentUserRating] = await Promise.all([commentsColletion.get(), getAverageRating(movieId, false), getMovieCastAndDirectors(movieId), getMovieProviders(movieId), getCurrentUserMovieRating(movieId, currentUserEmail)])

    const movieDetails = new MovieDetails()
    movieDetails.setAverageRating(averageResult)
    movieDetails.setPeople(peopleResult)
    movieDetails.setProviders(movieProviders)
    movieDetails.setCurrentUserRating(currentUserRating)

    let usersComments: Promise<UserBase>[] = []

    for (const docComment of commentsResult.docs) {
        const docData = docComment.data()

        usersComments.push(getUserByEmail(docData.userEmail))

        const currentComment = new MovieComment(docComment.id, docData.content, new Date(docData.date), docData.userEmail);

        movieDetails.addComment(currentComment)
    }

    await Promise.all(usersComments).then(users => {
        let index = 0;
        for (const user of users) {
            movieDetails.getComments()[index].setUserName(user.getName())
            index++
        }
    })
 
    let promisses: Promise<GetTotalLikesResponse>[] = []
    let promissesCurrentUserLiked: Promise<boolean>[] = []
    
    for (const comment of movieDetails.getComments()) {
        promisses.push(getTotalLikes(movieId, comment.getId()))
        promissesCurrentUserLiked.push(likedByCurrentUser(movieId, comment.getId(), currentUserEmail))
    }

    await Promise.all(promisses).then(results => {
        results.forEach((obj, i) => {
            movieDetails.getComments()[i].setLikes(obj.totalLikes)
        })
    })

    await Promise.all(promissesCurrentUserLiked).then(results => {
        results.forEach((result, i) => {
            movieDetails.getComments()[i].setLikedByCurrentUser(result)
        })
    })

    console.log(movieDetails)
    return movieDetails
}

export { getMovieDetails }