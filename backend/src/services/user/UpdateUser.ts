import { adminAuth, firestore } from "../../firebase/firebase-config";
import { USER_COLLECTION } from "../../utils/Constants";

export interface UserToUpdate {
    name: string;
    gender: string;
    birthday: Date;
    favoriteMovie: string;
    favoriteMovieGenre: number;
}

async function updateUserByEmail(email: string, user: UserToUpdate): Promise<UserToUpdate> {
    if (!email) {
        throw new Error("E-mail é necessário para atualizar o perfil.")
    }
    const uid = (await adminAuth.getUserByEmail(email)).uid
    const userRef = firestore.collection(`${USER_COLLECTION}`).doc(uid)

    for (let attribute in user) {
        // Verifica se o tipo é diferente de number pois não queremos remover o atributo caso ele tenha valor 0
        if (!user[attribute] && typeof user[attribute] != "number" || 
            typeof user[attribute] == "number" && Number.isNaN(user[attribute]) || 
            user[attribute] instanceof Date && Number.isNaN(new Date(user[attribute]).getTime())) {
             delete user[attribute]
        }
    }

    console.log(user)
    await userRef.update(user)
    return user;
}

export { updateUserByEmail }