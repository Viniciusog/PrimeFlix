import { RouteOptions } from "fastify";
import { getAdminsController } from "../controllers/AdminController";

const adminRoutes: RouteOptions[] = [
    {
        method: "GET",
        url: "/admins",
        handler: getAdminsController
    },
]

export { adminRoutes }