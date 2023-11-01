import { Admin } from "../../entities/Admin";
import { MovieGenre } from "../../entities/MovieGenre";
import { User } from "../../entities/User";
import { UserBase, UserRole } from "../../entities/UserBase";
import { adminAuth, firestore } from "../../firebase/firebase-config";
import { USER_COLLECTION } from "../../utils/Constants";
import { fromMovieGenreToString } from "../../utils/FromMovieGenreToString";

async function getUserByEmail(email: string): Promise<UserBase> {
    const firebaseUser = await adminAuth.getUserByEmail(email);
    if (firebaseUser) {
        const responseGetByUid = await getUserByUid(firebaseUser.uid);
        return responseGetByUid
    }    
    throw new Error("Usuário com e-mail " + email + " não foi encontrado.")
}

/** Retorna UserBase, que pode ser User ou Admin */
async function getUserByUid(uid: string): Promise<UserBase> {
    const usersCollection = firestore.collection(USER_COLLECTION);
    const results = await usersCollection.doc(uid).get();
    const userData = results.data()

    if (userData) {
        if (userData.role == UserRole.User) {
            const myUser = new User(userData.uid);
            myUser.setEmail(userData.email)

            let birthdaySecToMili;
            let birthdayNanoToMili;

            if (userData.birthday) {
                birthdaySecToMili = userData.birthday.seconds * 1000
                birthdayNanoToMili = userData.birthday.nanoseconds / 1000000
            }
            
            myUser.setBirthday(new Date(birthdaySecToMili + birthdayNanoToMili))
            
            myUser.setName(userData.name)
            myUser.setFavoriteMovie(userData.favoriteMovie)

            if (userData.favoriteMovieGenre) {
                myUser.setFavoriteMovieGenre(new MovieGenre(Number.parseInt(userData.favoriteMovieGenre), 
                    fromMovieGenreToString(Number.parseInt(userData.favoriteMovieGenre)) || ""))
            }
    
            myUser.setGender(userData.gender);

            const lastLoginSecToMili = userData.lastLogin.seconds * 1000
            const lastLoginNanoToMili = userData.lastLogin.nanoseconds / 1000000
            myUser.setLastLogin(new Date(lastLoginSecToMili + lastLoginNanoToMili))
            return myUser;
        } else if (userData.role == UserRole.Admin) {
            const myAdmin = new Admin(userData.uid, userData.email, userData.name);
            return myAdmin;
        }
    } 
    throw new Error("Erro ao recuperar usuário pelo uid " + uid + ".")
}

export { getUserByEmail, getUserByUid }