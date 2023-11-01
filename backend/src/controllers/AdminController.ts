import { FastifyReply, FastifyRequest } from "fastify";
import { getAdmins } from "../services/admin/GetAdmins";
import { getMovieByIdFromTMDB } from "../axios/tmdb/GetMovieById";
import { verifyPermission } from "../services/auth/VerifyPermission";
import { UserRole } from "../entities/UserBase";
import { StandardError } from "../exceptions/StandardError";
import { ACCESS_DENIED } from "../utils/Constants";

async function getAdminsController(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    try {
        await verifyPermission(req, [UserRole.Admin])
        const admins = await getAdmins()
        return reply.send(admins)
    } catch (error) {
        const myError = new StandardError(400, error.message, new Date(), req.routeOptions.url);
        if (error.message.includes(ACCESS_DENIED)) {
            myError.setStatusCode(403)
        } 
        return reply.code(myError.getStatusCode()).send(myError);
    } 
}



export { getAdminsController }
