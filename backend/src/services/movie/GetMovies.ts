import { getMovieByIdFromTMDB } from "../../axios/tmdb/GetMovieById";
import { Movie } from "../../entities/Movie";
import { MovieComment } from "../../entities/MovieComment";
import { MovieRating } from "../../entities/MovieRating";
import { firestore } from "../../firebase/firebase-config";
import { COMMENT_COLLECTION, MOVIE_COLLECTION, RATING_COLLECTION } from "../../utils/Constants";

/**
 * ! Não é para utilizar essa função, ela será removida
 */
async function getMovies(): Promise<Movie[]> {
    const moviesColletion = firestore.collection(MOVIE_COLLECTION);
  
    try {
      const movies: Movie[] = [];
  
      const querySnapshot = await moviesColletion.get();
  
      for (const doc of querySnapshot.docs) {
        console.log("Entrando no filme " + doc.id + "....");
  
        // Filme/" + doc.id.toString() + "/Comentario")
        const commentsColletion = firestore.collection(`${MOVIE_COLLECTION}/${doc.id.toString()}/${COMMENT_COLLECTION}`);

        console.log("comments colletion", commentsColletion)
  
        let currentMovie = new Movie(Number.parseInt(doc.id));
        
        const movieFromTMDB = await getMovieByIdFromTMDB(Number.parseInt(doc.id));
        console.log(movieFromTMDB)
        //currentMovie.setName(movieFromTMDB.original_title)
  
        const queryComments = await commentsColletion.get();
  
        for (const docComment of queryComments.docs) {
          console.log("Entrando no comentário " + docComment.id + "...");
          console.log("Conteúdo do comentário " + docComment.id + ": ", docComment.data());
  
          const seconds = docComment.data().date.seconds;
          const nanoseconds  = docComment.data().date.nanoseconds;
          const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);

          const currentComment = new MovieComment(docComment.id, docComment.data().contentz, new Date(milliseconds), docComment.data().userEmail);
  
          console.log("Current comment: ", currentComment);
  
          //currentMovie.addComment(currentComment);
          console.log("Estado do filme atual: ", currentMovie);
        }
  
        // Filme/" + doc.id.toString() + "/Avaliacao
        const ratingsCollection = firestore.collection(`${MOVIE_COLLECTION}/${doc.id.toString()}/${RATING_COLLECTION}`);
  
        const queryRating  = await ratingsCollection.get();
  
        for (const docRating of queryRating.docs) {
          console.log("Entrando na avaliação " + docRating.id + "...");
          console.log("Conteúdo da avaliação " + docRating.id + ": ", docRating.data());
  
          const currentRating = new MovieRating(docRating.id, docRating.data().hearts, docRating.data().userEmail);
  
          console.log("Current rating: ", currentRating);
  
          //currentMovie.addRating(currentRating);
          console.log("Estado do filme atual: ", currentMovie);
        }
  
        movies.push(currentMovie);
        console.log('Documento:', doc.id, ' => ', doc.data());
      }
  
      console.log("Retornando o array de filmes...")
      return movies;
    } catch (error) {
      console.error('Erro ao acessar o Firestore:', error);
      throw error; // Rejeita a Promise com o erro para que seja tratado externamente
    }
}

export { getMovies }