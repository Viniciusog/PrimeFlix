/* interface JavaScriptObjectUser {
  id: string;
  name: string;
  email: string;
  gender: string;
  favoriteMovieGenre: string;
  favoriteMoviesIds: number[];
  password: string;
} */

import { MovieGenre } from "./MovieGenre";
import { UserBase, UserRole } from "./UserBase";


class User extends UserBase {

    private gender: string;
    private favoriteMovieGenre: MovieGenre;
    private favoriteMoviesIds: number[] = [];
    private birthday: Date;
    private favoriteMovie: string;
    private lastLogin: Date;
  
    constructor(
      uid: string,
      name: string = "",
      email: string = "",
      gender: string = "",
      birthday: Date = new Date(),
      favoriteMovie: string = "",
      lastLogin: Date = new Date()
    ) {
      super(uid, name, email, UserRole.User);
      this.gender = gender;
      this.birthday = birthday;
      this.favoriteMovie = favoriteMovie;
      this.lastLogin = lastLogin;
    }
  
    getGender(): string {
      return this.gender;
    }
  
    setGender(gender: string): void {
      this.gender = gender;
    }
  
    getFavoriteMovieGenre(): MovieGenre {
      return this.favoriteMovieGenre;
    }
  
    setFavoriteMovieGenre(genre: MovieGenre): void {
      this.favoriteMovieGenre = genre;
    }
  
    getFavoriteMoviesIds(): number[] {
      return this.favoriteMoviesIds;
    }
  
    addFavoriteMovieId(movieId: number): void {
      this.favoriteMoviesIds.push(movieId);
    }

    setBirthday(birthday: Date) {
      this.birthday = birthday;
    }

    getBirthday(): Date {
      return this.birthday;
    }

    getFavoriteMovie(): string {
      return this.favoriteMovie;
    }
    
    setFavoriteMovie(favoriteMovie: string): void {
      this.favoriteMovie = favoriteMovie;
    }

    setLastLogin(lastLogin: Date) {
      this.lastLogin = lastLogin;
    }

    getLastLogin(): Date {
      return this.lastLogin;
    }

    toFormattedFirebaseObject() {
      const myObject = {
        uid: this.getUid(),
        name: this.getName(),
        email: this.getEmail(),
        birthday: this.getBirthday(),
        gender: this.getGender(),
        role: this.getRole(),
        favoriteMovie: this.getFavoriteMovie(),
        favoriteMovieGenre: this.getFavoriteMovieGenre().getId(),
        favoriteMoviesIds: this.getFavoriteMoviesIds(),
        lastLogin: this.getLastLogin()
      }
      return JSON.parse(JSON.stringify(myObject));
    }
    
    toObject() {
      return JSON.parse(JSON.stringify(this))
    }
}

export { User }