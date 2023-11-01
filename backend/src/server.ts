import { RouteOptions, fastify } from "fastify";
import { routes } from "./routes/routes";
import cors from "@fastify/cors";

const server = fastify()

server.register(cors, {
    origin: "*", // Permite requisições de qualquer origem
});

server.listen({port:3333})

console.log("Rotas")
console.log(routes)

routes.forEach((r: RouteOptions) => {
    server.route(r)
})
