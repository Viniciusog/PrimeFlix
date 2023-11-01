import { AverageRatingResponse } from "../services/rating/getAverageRating";
import { User } from "./User";

class MovieRating {
    private id: string;
    private hearts: number;
    private userEmail: string;
    private averageMovieRating:AverageRatingResponse;

    constructor(id: string, hearts: number, userEmail: string) {
        this.id = id;
        this.hearts = hearts;
        this.userEmail = userEmail;
    }

    setAverageMovieRating(averageMovieRating: AverageRatingResponse) {
      this.averageMovieRating = averageMovieRating;
    }

    getAverageMovieRating(): AverageRatingResponse {
      return this.averageMovieRating;
    }
  
    getId(): string {
      return this.id;
    }
  
    setId(id: string): void {
      this.id = id;
    }
  
    getHearts(): number {
      return this.hearts;
    }
  
    setHearts(hearts: number): void {
      this.hearts = hearts;
    }
  
    getUserEmail(): string {
      return this.userEmail;
    }
  
    setUserEmail(userEmail: string): void {
      this.userEmail = userEmail;
    }   
    
    toObject() {
      return JSON.parse(JSON.stringify(this))
    }
}

export {MovieRating}