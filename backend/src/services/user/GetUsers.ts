import { MovieGenre } from "../../entities/MovieGenre";
import { User } from "../../entities/User";
import { UserRole } from "../../entities/UserBase";
import { firestore } from "../../firebase/firebase-config";
import { USER_COLLECTION } from "../../utils/Constants";
import { fromMovieGenreToString } from "../../utils/FromMovieGenreToString";

/** Retorna usuários com role USER */
async function getUsers(): Promise<User[]> {
    const usuarioCollectionRef = firestore.collection(USER_COLLECTION);
  
    try {
      const querySnapshot = await usuarioCollectionRef.where("role", "==", UserRole.User).get();
      const users: User[] = [];
  
      querySnapshot.forEach(doc => {
        const userData = doc.data();

        let birthdaySecToMili;
        let birthdayNanoToMili;
        
        if (userData.birthday) {
          birthdaySecToMili = userData.birthday.seconds * 1000
          birthdayNanoToMili = userData.birthday.nanoseconds / 1000000
        }
        
        let lastLoginSecToMili;
        let lastLoginNanoToMili;
        
        if (userData.lastLogin) {
          lastLoginSecToMili = userData.lastLogin.seconds * 1000
          lastLoginNanoToMili = userData.lastLogin.nanoseconds / 1000000
        }

        let currentUser = new User(doc.id, userData.name, userData.email, userData.gender, new Date(birthdaySecToMili + birthdayNanoToMili), userData.favoriteMovie, new Date(lastLoginSecToMili + lastLoginNanoToMili));

        if (userData.favoriteMovieGenre) {
          //O parseInt ao aplicar em string não numérica, retorna NaN
          currentUser.setFavoriteMovieGenre(new MovieGenre(Number.parseInt(userData.favoriteMovieGenre), 
              fromMovieGenreToString(Number.parseInt(userData.favoriteMovieGenre)) || ""))
        }

        userData.favoriteMoviesIds?.forEach((id: string) => {
          currentUser.addFavoriteMovieId(Number.parseInt(id))
        })

        users.push(currentUser);
      });
  
      return users;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
}

export { getUsers }