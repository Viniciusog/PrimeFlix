import { User } from "../../entities/User";
import { firestore } from "../../firebase/firebase-config";
import { USER_COLLECTION } from "../../utils/Constants";

async function addUser(user: User): Promise<void> {

    
    console.log("My user:", user)

    const usersCollection = firestore.collection(USER_COLLECTION);
    
    // O id do usuário no firebase vai ser o email dele
    // ! Aqui estava toObject antes
    const result = await usersCollection.doc(user.getUid()).set(user.toFormattedFirebaseObject());
    return result;
}

export { addUser }