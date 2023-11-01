import { adminAuth } from "../../firebase/firebase-config";

async function verifyEmail(email: string): Promise<void> {
    const uid = (await adminAuth.getUserByEmail(email)).uid
    const userRecord = await adminAuth.updateUser(uid, {email: email, emailVerified: true})
    console.log("E-mail verificado", userRecord)
}

export { verifyEmail }