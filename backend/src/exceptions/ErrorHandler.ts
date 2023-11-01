import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { StandardError } from "./StandardError";

function handleErrors(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
    const myStatusCode = error.statusCode ? error.statusCode : 400;
    const myError = new StandardError(myStatusCode, error.message, new Date(), request.routeOptions.url);
    return reply.code(400).send(myError);
}

export { handleErrors }