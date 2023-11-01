import { FastifyRequest } from "fastify";
import { UserRole } from "../../entities/UserBase";
import { adminAuth } from "../../firebase/firebase-config";
import { getUserByUid } from "../user/GetUserByEmail";
import { ACCESS_DENIED } from "../../utils/Constants";
import { MSG_TOKEN_EXPIRED, TOKEN_EXPIRED } from "../../exceptions/ErrorConstants";

async function verifyPermission(req: FastifyRequest, rolesAllowed: UserRole[]): Promise<void> {
    try {
        if (rolesAllowed.includes(UserRole.Visitor)) {
            return;
        }
        const accessToken = req.headers.authorization?.replace("Bearer ", "")
        console.log("Access token: ", accessToken)
        if (accessToken) {
            const decodedIdToken = await adminAuth.verifyIdToken(accessToken)
    
            const myUser = await getUserByUid(decodedIdToken.uid)

            if (!rolesAllowed.includes(myUser.getRole())) {
                console.log("User doesnt have permission")
                throw new Error(ACCESS_DENIED);
            }
        } else {
            throw new Error(ACCESS_DENIED);
        }
    } catch (error) {
        if (error.code == TOKEN_EXPIRED) {
            throw new Error(ACCESS_DENIED + " " + MSG_TOKEN_EXPIRED)
        } else if (!error.message.toString().includes(ACCESS_DENIED)) {
            console.log(error)
            throw new Error(ACCESS_DENIED);
        }
        throw error;
    }
}

export { verifyPermission }