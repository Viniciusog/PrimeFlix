import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { verifyPermission } from "../services/auth/VerifyPermission";
import { UserRole } from "../entities/UserBase";
import { StandardError } from "../exceptions/StandardError";
import { ACCESS_DENIED } from "../utils/Constants";
import { addComment } from "../services/comment/AddComment";
import { MovieComment } from "../entities/MovieComment";
import { adminAuth } from "../firebase/firebase-config";
import { getTokenFromHeader } from "../utils/GetTokenFromHeader";
import { likeComment } from "../services/comment/LikeComment";
import { dislikeComment } from "../services/comment/DislikeComment";
import { getTotalLikes } from "../services/comment/GetTotalLikes";

async function addCommentController(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    try {
        await verifyPermission(req, [UserRole.Admin, UserRole.User])
        const requestBody = req.body as any //id: string, content: string, likes: number, date: Date, userEmail: string
        const email = (await adminAuth.verifyIdToken(getTokenFromHeader(req))).email || ""
        const myComment = new MovieComment("",requestBody.content, requestBody.date || new Date(), email)
        const response = await addComment(requestBody.movieId, myComment)
        return reply.code(201).send(response)
    } catch (error) {
        console.log(error)
        const myError = new StandardError(400, error.message, new Date(), req.routeOptions.url);
        if (error.message.includes(ACCESS_DENIED)) {
            myError.setStatusCode(401)
        } 
        return reply.code(myError.getStatusCode()).send(myError);
    }
}

async function likeCommentController(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    try {
        console.log("Token backend: " + getTokenFromHeader(req))
        await verifyPermission(req, [UserRole.Admin, UserRole.User])
        const reqParams = req.params as any;
        const movieId = reqParams.movieId;
        const commentId = reqParams.commentId
        const userEmail = (await adminAuth.verifyIdToken(getTokenFromHeader(req))).email || ""
        await likeComment(movieId, commentId, userEmail)
        return reply.send("Curtida adicionada.")
    } catch (error) {
        console.log(error)
        const myError = new StandardError(500, error.message, new Date(), req.routeOptions.url);
        if (error.message.includes(ACCESS_DENIED)) {
            myError.setStatusCode(401)
        } 
        return reply.code(myError.getStatusCode()).send(myError);
    } 
}

async function dislikeCommentController(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    try {
        await verifyPermission(req, [UserRole.Admin, UserRole.User])
        const reqParams = req.params as any;
        const movieId = reqParams.movieId;
        const commentId = reqParams.commentId
        const userEmail = (await adminAuth.verifyIdToken(getTokenFromHeader(req))).email || ""
        await dislikeComment(movieId, commentId, userEmail)
        return reply.send("Curtida removida.")
    } catch (error) {
        console.log(error)
        const myError = new StandardError(500, error.message, new Date(), req.routeOptions.url);
        if (error.message.includes(ACCESS_DENIED)) {
            myError.setStatusCode(401)
        } 
        return reply.code(myError.getStatusCode()).send(myError);
    } 
}

async function getTotalLikesController(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    try {
        const reqParams = req.params as any;
        const movieId = reqParams.movieId;
        const commentId = reqParams.commentId
        const result = await getTotalLikes(movieId, commentId)
        console.log(result)
        return reply.send(result)
    } catch (error) {
        console.log(error)
        const myError = new StandardError(500, error.message, new Date(), req.routeOptions.url);
        if (error.message.includes(ACCESS_DENIED)) {
            myError.setStatusCode(401)
        } 
        return reply.code(myError.getStatusCode()).send(myError);
    } 
}

export { addCommentController, likeCommentController, dislikeCommentController, getTotalLikesController }
