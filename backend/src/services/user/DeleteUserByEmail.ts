import { adminAuth, firestore } from "../../firebase/firebase-config"
import { USER_COLLECTION } from "../../utils/Constants";

async function deleteUserByEmail(email: string): Promise<void> {
    const uid = (await adminAuth.getUserByEmail(email)).uid
    const userRef = firestore.collection(USER_COLLECTION).doc(uid)
    const response = await userRef.delete();
    await adminAuth.deleteUser(uid)
}

export { deleteUserByEmail }