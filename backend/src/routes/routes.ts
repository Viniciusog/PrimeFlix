import { RouteOptions } from "fastify";
import { userRoutes } from "./UserRoutes";
import { movieRoutes } from "./MovieRoutes";
import { adminRoutes } from "./AdminRoutes";
import { authRoutes } from "./AuthRoutes";

const routes: RouteOptions[] = []

routes.push(...userRoutes)
routes.push(...movieRoutes)
routes.push(...adminRoutes)
routes.push(...authRoutes)

export { routes }