import { adminAuth } from "../../firebase/firebase-config";

async function isEmailVerified(email: string): Promise<boolean> {
    try {
        const response = await adminAuth.getUserByEmail(email);
        return response.emailVerified;
    } catch (error) {
        throw new Error("Usuário não encontrado com o e-mail " + email + ".");
    } 
}

export { isEmailVerified }