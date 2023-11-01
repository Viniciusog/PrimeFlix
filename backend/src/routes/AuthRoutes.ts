import { RouteOptions } from "fastify";
import { registerWithEmailAndPassword, signInWithEmailAndPassword, sendChangePasswordLinkController, confirmPasswordChangeController, verifyEmailController } from "../controllers/AuthController";

const authRoutes: RouteOptions[] = [
    {
        method: "POST",
        url: "/register",
        handler: registerWithEmailAndPassword
    },
    {
        method: "POST",
        url: "/signin",
        handler: signInWithEmailAndPassword
    },
    {
        method: "POST",
        url: "/verifyemail",
        handler: verifyEmailController
    },
    {
        method: "PATCH",
        url: "/sendchangepasswordlink",
        handler: sendChangePasswordLinkController
    },
    {
        method: "PATCH",
        url: "/confirmpasswordchange",
        handler: confirmPasswordChangeController
    },
]

export { authRoutes }