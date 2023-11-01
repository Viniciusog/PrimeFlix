import { FastifyReply, FastifyRequest } from "fastify";
import { getUsers } from "../services/user/GetUsers";
import { deleteUserByEmail } from "../services/user/DeleteUserByEmail";
import { verifyPermission } from "../services/auth/VerifyPermission";
import { UserRole } from "../entities/UserBase";
import { StandardError } from "../exceptions/StandardError";
import { ACCESS_DENIED } from "../utils/Constants";
import { getTokenFromHeader } from "../utils/GetTokenFromHeader";
import { adminAuth } from "../firebase/firebase-config";
import { getUserByEmail } from "../services/user/GetUserByEmail";
import jwt from "jsonwebtoken"
import { UserToUpdate, updateUserByEmail } from "../services/user/UpdateUser";

async function getUsersController(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    try {
        await verifyPermission(req, [UserRole.Admin, UserRole.User])
        const users = await getUsers()
        return reply.send(users)
    } catch (error) {
        console.log(error)
        const myError = new StandardError(400, error.message, new Date(), req.routeOptions.url);
        if (error.message.includes(ACCESS_DENIED)) {
            myError.setStatusCode(401)
        } 
        return reply.code(myError.getStatusCode()).send(myError);
    }
}

async function removeUserByEmailController(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    try {
        await verifyPermission(req, [UserRole.Admin])
        const reqBody = req.body as any
        const email = reqBody.email
        await deleteUserByEmail(email)
        return reply.send("Usuário removido com sucesso.")
    } catch (error) {
        const myError = new StandardError(400, error.message, new Date(), req.routeOptions.url);
        if (error.message.includes(ACCESS_DENIED)) {
            myError.setStatusCode(403)
        } 
        return reply.code(myError.getStatusCode()).send(myError);
    }
}

async function updateProfileController(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    try {
        await verifyPermission(req, [UserRole.User, UserRole.Admin])
        const email = (await adminAuth.verifyIdToken(getTokenFromHeader(req))).email || ""
        const reqBody = req.body as any;

        const name = reqBody.name;
        const gender = reqBody.gender;
        const birthday = new Date(reqBody.birthday);
        const favoriteMovie = reqBody.favoriteMovie;
        const favoriteMovieGenre = Number.parseInt(reqBody.favoriteMovieGenre);
        
        const myUser: UserToUpdate = {
            name,
            gender,
            birthday,
            favoriteMovie,
            favoriteMovieGenre
        }

        const userResult = await updateUserByEmail(email, myUser)
        return reply.send(userResult)
    } catch (error) {
        const myError = new StandardError(500, error.message, new Date(), req.routeOptions.url);
        if (error.message.includes(ACCESS_DENIED)) {
            myError.setStatusCode(403)
        } 
        return reply.code(myError.getStatusCode()).send(myError);
    }
}

async function getUserByEmailController(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    try {
        await verifyPermission(req, [UserRole.User, UserRole.Admin])
        const email = (await adminAuth.verifyIdToken(getTokenFromHeader(req))).email as string
        const user = await getUserByEmail(email)
        return reply.send(user)
    } catch (error) {
        const myError = new StandardError(500, error.message, new Date(), req.routeOptions.url);
        if (error.message.includes(ACCESS_DENIED)) {
            myError.setStatusCode(403)
        } 
        return reply.code(myError.getStatusCode()).send(myError);
    }
}

export { getUsersController, removeUserByEmailController, getUserByEmailController, updateProfileController }
