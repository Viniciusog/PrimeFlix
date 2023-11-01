import { RouteOptions } from "fastify";
import { addCommentController, likeCommentController, dislikeCommentController, getTotalLikesController } from "../controllers/CommentController";
import { addRatingController } from "../controllers/RatingController";
import { getAverageRatingController } from "../controllers/RatingController";
import { adminAuth, auth } from "../firebase/firebase-config";
import { addFavoriteMovieController, getFavoriteMoviesController, getMovieCurrentUserRatingController, getMovieDetailsController, getMoviesController, getMoviesRecommendationController, removeAllFavoriteMoviesController, removeFavoriteMovieController   } from "../controllers/MovieController";

const movieRoutes: RouteOptions[] = [
    {
        method: "GET",
        url: "/movies",
        handler: getMoviesController
    },
    {
        method: "POST",
        url: "/movies/comments",
        handler: addCommentController
    },
    {
        method: "GET",
        url: "/movies/comments",
        handler: addCommentController
    },
    {
        method: "POST",
        url: "/movies/ratings",
        handler: addRatingController
    },
    {
        method: "GET",
        url: "/movies/:movieId/rating",
        handler: getAverageRatingController
    },
    {
        method: "GET",
        url: "/movies/:movieId/details",
        handler: getMovieDetailsController,
    },
    {
        method: "GET",
        url: "/movies/recommendations/:genreId",
        handler: getMoviesRecommendationController
    },
    {
        method: "POST",
        url: "/movies/favorite", 
        handler: addFavoriteMovieController
    },
    {
        method: "DELETE",
        url: "/movies/favorite/:movieId",
        handler: removeFavoriteMovieController
    },
    {
        method: "DELETE",
        url: "/movies/favorite",
        handler: removeAllFavoriteMoviesController,
    },
    {
        method: "GET",
        url: "/movies/favorite",
        handler: getFavoriteMoviesController,
    },
    {
        method: "POST",
        url: "/movies/:movieId/comments/:commentId/like",
        handler: likeCommentController
    },
    {
        method: "POST",
        url: "/movies/:movieId/comments/:commentId/dislike",
        handler: dislikeCommentController
    },
    {
        method: "GET",
        url: "/movies/:movieId/comments/:commentId/totalLikes",
        handler: getTotalLikesController
    },
    {
        method: "GET",
        url: "/movies/:movieId/currentUserRating",
        handler: getMovieCurrentUserRatingController
    }
]

export { movieRoutes }