import { FastifyRequest } from "fastify";
import { adminAuth, firestore } from "../../firebase/firebase-config";
import { USER_COLLECTION } from "../../utils/Constants";
import { Movie } from "../../entities/Movie";
import { MovieTMDB, getMovieByIdFromTMDB } from "../../axios/tmdb/GetMovieById";
import { MovieGenre } from "../../entities/MovieGenre";

async function getFavoriteMovies(req: FastifyRequest): Promise<Movie[]> {
    const accessToken = req.headers.authorization?.replace("Bearer ", "") || ""
    const uid = (await adminAuth.verifyIdToken(accessToken)).uid
    const userData = (await firestore.collection(USER_COLLECTION).doc(uid).get()).data()
    
    let movies: Movie[] = []

    if (userData) {
        const movieIds: number[] = userData.favoriteMoviesIds;

        let promisses: Promise<MovieTMDB>[] = []

        for (const id of movieIds) {
            promisses.push(getMovieByIdFromTMDB(id))
        }

        await Promise.all(promisses).then(results => {
            for (const movie of results) {
                const myMovie = new Movie(movie.id);
                myMovie.setOriginalTitle(movie.original_title)
                myMovie.setOverview(movie.overview)
                myMovie.setRuntime(movie.runtime)
                myMovie.setTitle(movie.title)
                myMovie.setReleaseDate(new Date(movie.release_date))
                myMovie.setPosterPath(movie.poster_path || "")
                myMovie.setVoteAverage(movie.vote_average)
                for (const genre of movie.genres) {
                    myMovie.addGenre(new MovieGenre(genre.id, genre.name))
                }
                movies.push(myMovie)
            }
        }).catch(err => {
            console.log("Error Promise.all: ", err)
        })
    } else {
        throw Error("Usuário não encontrado.")
    }
    return movies;
}

/* async function getFavoriteMovies2(req: FastifyRequest): Promise<Movie[]> {
    const accessToken = req.headers.authorization?.replace("Bearer ", "") || ""
    const uid = (await adminAuth.verifyIdToken(accessToken)).uid
    const userData = (await firestore.collection(USER_COLLECTION).doc(uid).get()).data()
    
    let movies: Movie[] = []

    if (userData) {
        const movieIds: number[] = userData.favoriteMoviesIds;

        for (const id of movieIds) {
            const movie = await getMovieByIdFromTMDB(id)

            const myMovie = new Movie(movie.id);
            myMovie.setOriginalTitle(movie.original_title)
            myMovie.setOverview(movie.overview)
            myMovie.setRuntime(movie.runtime)
            myMovie.setTitle(movie.title)
            myMovie.setReleaseDate(new Date(movie.release_date))
            myMovie.setPosterPath(movie.poster_path || "")
            for (const genre of movie.genres) {
                myMovie.addGenre(new MovieGenre(genre.id, genre.name))
            }
            movies.push(myMovie)
        }
    } else {
        throw Error("Usuário não encontrado.")
    }
    return movies;
} */


export { getFavoriteMovies/* , getFavoriteMovies2  */}