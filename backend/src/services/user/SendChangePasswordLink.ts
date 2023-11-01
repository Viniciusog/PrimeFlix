import { auth } from "../../firebase/firebase-config";

interface ChangePasswordResponse {
    success: boolean;
    message: string;
}

async function sendChangePasswordLink(email: string): Promise<ChangePasswordResponse> {
    try {
        const ret = await auth.sendPasswordResetEmail(email)
        return { success: true, message: 'Password updated successfully.' };
    } catch (error) {
        return { success: false, message: 'Failed to update password. ' + error.message };
    }
}

export { sendChangePasswordLink };