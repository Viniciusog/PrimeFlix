import { FastifyRequest } from "fastify";

function getTokenFromHeader(req: FastifyRequest): string {
    const accessToken = req.headers.authorization?.replace("Bearer ", "") || ""
    return accessToken;
}

export { getTokenFromHeader }