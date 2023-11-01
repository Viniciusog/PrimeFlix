import { adminAuth, auth } from "../../firebase/firebase-config";

interface ChangePasswordResponse {
    success: boolean;
    message: string;
}

async function confirmPasswordChange(code: string, newpw: string): Promise<ChangePasswordResponse> {
    try {
        const userEmail = await auth.verifyPasswordResetCode(code)
        console.log("confirmPasswordChange - userEmail: " + userEmail)
        //const uid = (await adminAuth.getUserByEmail(userEmail)).uid
        await auth.confirmPasswordReset(code, newpw)
        //await adminAuth.updateUser(uid, {password: newpw})
        return { success: true, message: 'Password updated successfully.' };
    } catch (error) {
        console.log(error)
        return { success: false, message: 'Failed to update password. ' + error.message };
    }
}

export { confirmPasswordChange };