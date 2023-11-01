import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { verifyPermission } from "../services/auth/VerifyPermission";
import { UserRole } from "../entities/UserBase";
import { StandardError } from "../exceptions/StandardError";
import { ACCESS_DENIED } from "../utils/Constants";
import { addRating } from "../services/rating/addRating";
import { MovieRating } from "../entities/MovieRating";
import { getAverageRating } from "../services/rating/getAverageRating";
import { getTokenFromHeader } from "../utils/GetTokenFromHeader";
import { adminAuth } from "../firebase/firebase-config";

export async function addRatingController(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    try{
        await verifyPermission(req, [UserRole.Admin, UserRole.User]);
        const requestBody = req.body as any;
        const email = (await adminAuth.verifyIdToken(getTokenFromHeader(req))).email || ""
        const myRating = new MovieRating("", requestBody.hearts, email);
        const response = await addRating(requestBody.movieId, myRating);
        return reply.code(201).send(response);
    }
    catch (error){
        const myError = new StandardError(400, error.message, new Date(), req.routeOptions.url);
        if (error.message.includes(ACCESS_DENIED)) {
            myError.setStatusCode(401)
        } 
        return reply.code(myError.getStatusCode()).send(myError);
    }
}

export async function getAverageRatingController(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
        const myParams = request.params as any;
        const movieId = myParams.movieId;
        const average = await getAverageRating(movieId);
        reply.send(average);
    } catch (error) {
        const myError = new StandardError(500, error.message, new Date(), request.routeOptions.url);
        if (error.message.includes(ACCESS_DENIED)){
            myError.setStatusCode(401);
        }
        return reply.code(myError.getStatusCode()).send(myError);
    }
}