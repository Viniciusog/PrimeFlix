import { FastifyReply, FastifyRequest } from "fastify";
import { adminAuth, auth } from "../firebase/firebase-config";
import { User } from "../entities/User";
import { addUser } from "../services/user/AddUser";
import { getUserByEmail } from "../services/user/GetUserByEmail";
import { isEmailVerified } from "../services/user/IsEmailVerified";
import { StandardError } from "../exceptions/StandardError";
import { INVALID_CREDENTIALS, MSG_INVALID_CREDENTIALS, MSG_USER_DISABLED, USER_DISABLED,
         WEAK_PASSWORD, MSG_WEAK_PASSWORD, EMAIL_ALREADY_IN_USE, MSG_EMAIL_ALREADY_IN_USE,
         INVALID_EMAIL, MSG_INVALID_EMAIL } from "../exceptions/ErrorConstants";
import { LoginResponse } from "../entities/LoginResponse";
import { verifyEmail } from "../services/auth/VerifyEmail";
import 'dotenv/config';
import { PERMISSION_DENIED } from "../utils/Constants";
import { sendChangePasswordLink } from "../services/user/SendChangePasswordLink";
import { confirmPasswordChange } from "../services/user/ConfirmChangePassword";
import { saveLastLogin } from "../services/user/SaveLastLogin";
import { MovieGenre } from "../entities/MovieGenre";
import { fromMovieGenreToString } from "../utils/FromMovieGenreToString";

async function registerWithEmailAndPassword(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    // auth.regist vinicius.guimaraes@catijr.com.br
    try {
        // Pegando os dados do corpo da requisição
        const requestBody = request.body as any;
        const email = requestBody.email;
        const password = requestBody.password;
        const name = requestBody.name;
        const gender = requestBody.gender;
        const favoriteMovieGenre = Number.parseInt(requestBody.favoriteMovieGenre)
        const birthday = new Date(requestBody.birthday);
        const favoriteMovie = requestBody.favoriteMovie;

        const response = await auth.createUserWithEmailAndPassword(email, password);

        if (response.user?.uid) {
            const myUser = new User(response.user.uid);
            myUser.setEmail(email);
            myUser.setName(name); 
            myUser.setGender(gender); 
            const formattedFavMovieGenre = new MovieGenre(favoriteMovieGenre, fromMovieGenreToString(favoriteMovieGenre) || "")
            myUser.setFavoriteMovieGenre(formattedFavMovieGenre); 
            myUser.setFavoriteMovie(favoriteMovie);
            myUser.setBirthday(birthday);

            const addUserResponse = await addUser(myUser);
            
            console.log("ADD USER RESPONSE")
            console.log(addUserResponse)
        }

        await response.user?.sendEmailVerification();
    } catch(error) {
        console.log("->> " + error.code)

        const myError = new StandardError(400, error.message, new Date(), request.routeOptions.url);
        if (error.code == WEAK_PASSWORD) {
            myError.setMessage(MSG_WEAK_PASSWORD);
        } else if (error.code == EMAIL_ALREADY_IN_USE){
            myError.setMessage(MSG_EMAIL_ALREADY_IN_USE);
        } else if (error.code == INVALID_EMAIL){
            myError.setMessage(MSG_INVALID_EMAIL);
        }
        return reply.code(myError.getStatusCode()).send(myError);
    }   
}

async function signInWithEmailAndPassword(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
        const requestBody = request.body as any;
        const email = requestBody.email;
        const password = requestBody.password;

        const emailVerified = await isEmailVerified(email);

        if (emailVerified) {
            const response = await auth.signInWithEmailAndPassword(email, password);

            const idToken = await response.user?.getIdToken() || "";
            
            const decodesIdToken = await adminAuth.verifyIdToken(idToken, undefined)
            console.log("DECODED AUTHENTICATION TOKEN")
            console.log(decodesIdToken)

            const user = await getUserByEmail(email);

            const loginResponse = new LoginResponse(200, "Login realizado com sucesso.", idToken, user.getRole())

            await saveLastLogin(email)

            return reply.send(loginResponse);
        } else {
            throw new Error("E-mail não verificado.")
        }
    } catch (error) {
        console.log("->> " + error.code)

        const myError = new StandardError(400, error.message, new Date(), request.routeOptions.url);

        if (error.code == INVALID_CREDENTIALS) {
            myError.setMessage(MSG_INVALID_CREDENTIALS);
        } else if (error.code == USER_DISABLED) {
            myError.setMessage(MSG_USER_DISABLED);
        }
        return reply.code(myError.getStatusCode()).send(myError);
    }    
}

async function verifyEmailController(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
        const requestBody = request.body as any;
        const email = requestBody.email;
        const key = requestBody.key;

        if (key == process.env.KEY_ROUTE_VERIFYEMAIL) {
            const response = await verifyEmail(email)
            reply.send("E-mail verificado com sucesso.")
        } else {
            throw new Error(PERMISSION_DENIED)
        }
    } catch (error) {
        const myError = new StandardError(400, error.message, new Date(), request.routeOptions.url);
        reply.send(myError)
        console.log("Erro ao verificar e-mail: ", error);
    }
}

async function sendChangePasswordLinkController( request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
        const requestBody = request.body as any
        const email = requestBody.email

        const response = await sendChangePasswordLink(email)
        console.log("Email: " + email)
        console.log(response)
        reply.send("Email para alterar senha mandado.")
    } catch (error) {
        console.log("sendChangePasswordLinkController error", error)
    }
}

async function confirmPasswordChangeController( request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try{
        const requestBody = request.body as any
        const code = requestBody.oobCode
        const newpw = requestBody.newpw

        console.log("REQUEST BODY")
        console.log(requestBody)
        console.log("oobCode: " + code)

        const response = await confirmPasswordChange(code, newpw)
        console.log(response)
        reply.send("Senha alterada.")
    }
    catch (error) {
        console.log("confirmPasswordChange", error)
    }
}

export { registerWithEmailAndPassword, signInWithEmailAndPassword, verifyEmailController, sendChangePasswordLinkController , confirmPasswordChangeController }