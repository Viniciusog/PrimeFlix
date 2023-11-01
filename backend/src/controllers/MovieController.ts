import { FastifyReply, FastifyRequest } from "fastify";
import { getMovies } from "../services/movie/GetMovies";
import { StandardError } from "../exceptions/StandardError";
import { verifyPermission } from "../services/auth/VerifyPermission";
import { UserRole } from "../entities/UserBase";
import { ACCESS_DENIED } from "../utils/Constants";
import { addFavoriteMovie } from "../services/movie/AddFavoriteMovie";
import { removeFavoriteMovie } from "../services/movie/removeFavoriteMovie";
import { removeAllFavoriteMovies } from "../services/movie/removeAllFavoriteMovies";
import { getMoviesByGenre } from "../axios/tmdb/GetMoviesByGenre";
import { getFavoriteMovies/* , getFavoriteMovies2 */ } from "../services/movie/GetFavoriteMovies";
import { getCurrentUserMovieRating, getMovieDetails } from "../services/movie/GetMovieDetails";
import { getTokenFromHeader } from "../utils/GetTokenFromHeader";
import jwt from "jsonwebtoken"

async function getMoviesController(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    try {
        const movies = await getMovies();
        return reply.send(movies)
    } catch (error) {
        const myError = new StandardError(500, error.message, new Date(), req.routeOptions.url);
        if (error.message.includes(ACCESS_DENIED)) {
            myError.setStatusCode(401)
        } 
        return reply.code(myError.getStatusCode()).send(myError);
    }  
}

async function getMovieDetailsController(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    try {
        const token: any = jwt.decode(getTokenFromHeader(req))
        
        let email = ""
        if (token) {
            email = token.email || "";
        }
        
        const reqParams = req.params as any
        const movies = await getMovieDetails(reqParams.movieId, email);
        return reply.send(movies)
    } catch (error) {
        const myError = new StandardError(500, error.message, new Date(), req.routeOptions.url);
        if (error.message.includes(ACCESS_DENIED)) {
            myError.setStatusCode(401)
        } 
        return reply.code(myError.getStatusCode()).send(myError);
    }  
}

async function addFavoriteMovieController(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    try {
        await verifyPermission(req, [UserRole.User, UserRole.Admin])
        const requestBody = req.body as any        
        const movieId = requestBody.movieId;
        await addFavoriteMovie(req, movieId);
        return reply.code(201).send("Filme favorito salvo com sucesso.")
    } catch (error) {
        const myError = new StandardError(400, error.message, new Date(), req.routeOptions.url);
        console.log(error.message)
        if (error.message.includes(ACCESS_DENIED)) {
            myError.setStatusCode(401)
        } 
        return reply.code(myError.getStatusCode()).send(myError);
    }
}

async function removeFavoriteMovieController(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    try {
        await verifyPermission(req, [UserRole.User, UserRole.Admin])
        const requestParams = req.params as any;
        const movieId = requestParams.movieId;
        await removeFavoriteMovie(req, movieId);
        return reply.code(200).send("Sucesso ao remover filme da lista de favoritos.")
    } catch (error) {
        const myError = new StandardError(400, error.message, new Date(), req.routeOptions.url);
        console.log(error.message)
        if (error.message.includes(ACCESS_DENIED)) {
            myError.setStatusCode(401)
        } 
        return reply.code(myError.getStatusCode()).send(myError);
    }
}

async function removeAllFavoriteMoviesController(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    try {
        await verifyPermission(req, [UserRole.User, UserRole.Admin])
        await removeAllFavoriteMovies(req);
        return reply.code(200).send("Sucesso ao remover todos os filmes da lista de favoritos.")
    } catch (error) {
        const myError = new StandardError(400, error.message, new Date(), req.routeOptions.url);
        console.log(error.message)
        if (error.message.includes(ACCESS_DENIED)) {
            myError.setStatusCode(401)
        } 
        return reply.code(myError.getStatusCode()).send(myError);
    }
}

async function getMoviesRecommendationController(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    try {
        const requestQuery = req.query as any;
        const requestParams = req.params as any;
        const genreId = requestParams.genreId;
        const page: number = requestQuery.page || 1;
        const response = await getMoviesByGenre(genreId, page);
        return reply.send(response);
    } catch (error) {
        const myError = new StandardError(400, error.message, new Date(), req.routeOptions.url);
        if (error.message.includes(ACCESS_DENIED)) {
            myError.setStatusCode(401);
        } 
        return reply.code(myError.getStatusCode()).send(myError);
    }
}

async function getFavoriteMoviesController(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    try {
        await verifyPermission(req, [UserRole.User, UserRole.Admin])
        const movies = await getFavoriteMovies(req)
        return reply.send(movies)
    } catch (error) {
        const myError = new StandardError(400, error.message, new Date(), req.routeOptions.url);
        console.log(error.message)
        if (error.message.includes(ACCESS_DENIED)) {
            myError.setStatusCode(401)
        } 
        return reply.code(myError.getStatusCode()).send(myError);
    }
}

interface ResultCurrentUserRating {
    currentUserRating: number | null;
}

async function getMovieCurrentUserRatingController(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    try {
        const token: any = jwt.decode(getTokenFromHeader(req))
        
        let email = ""
        if (token) {
            email = token.email || "";
        }

        const resultInterface: ResultCurrentUserRating = {currentUserRating: null}
        
        const reqParams = req.params as any
        const result = await getCurrentUserMovieRating(reqParams.movieId, email)
        resultInterface.currentUserRating = result;
        return reply.send(resultInterface)
    } catch (error) {
        const myError = new StandardError(400, error.message, new Date(), req.routeOptions.url);
        console.log(error.message)
        if (error.message.includes(ACCESS_DENIED)) {
            myError.setStatusCode(401)
        } 
        return reply.code(myError.getStatusCode()).send(myError);
    }
}

export { getMoviesController, getMoviesRecommendationController, addFavoriteMovieController, removeFavoriteMovieController, removeAllFavoriteMoviesController, getFavoriteMoviesController, getMovieDetailsController, getMovieCurrentUserRatingController/* , getMovieProvidersController  */}
