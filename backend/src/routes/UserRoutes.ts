import { RouteOptions } from "fastify";
import { getUserByEmailController, getUsersController, removeUserByEmailController, updateProfileController } from "../controllers/UserController";

const userRoutes: RouteOptions[] = [
    {
        method: "GET",
        url: "/users",
        handler: getUsersController
    },
    {
        method: "GET",
        url: "/profile",
        handler: getUserByEmailController
    },
    {
        method: "DELETE",
        url: "/users",
        handler: removeUserByEmailController
    },
    {
        method: "PUT",
        url: "/profile",
        handler: updateProfileController
    }
]

export { userRoutes }