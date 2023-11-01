import { adminAuth, firestore } from "../../firebase/firebase-config"
import { USER_COLLECTION } from "../../utils/Constants"

async function saveLastLogin(email: string): Promise<void> {
    const uid = (await adminAuth.getUserByEmail(email)).uid
    const userRef = firestore.collection(USER_COLLECTION).doc(uid)
    await userRef.update({
        "lastLogin": new Date()
    })
}

/** Esta função é apenas para teste */
/* async function saveAllLastLogin(): Promise<void> {
    const querySnapshot = await firestore.collection(USER_COLLECTION).get()
    
    querySnapshot.forEach(async doc => {
        await firestore.collection(USER_COLLECTION).doc(doc.id).update({
            "lastLogin": new Date()
        })
    })
} */

export { saveLastLogin }