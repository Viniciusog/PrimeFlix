import { MoviePeopleResponse } from "../axios/tmdb/GetMoviePeople";
import { MovieProvider } from "../axios/tmdb/GetMovieProviders";
import { AverageRatingResponse } from "../services/rating/getAverageRating";
import { MovieComment } from "./MovieComment";

class MovieDetails {

    private comments: MovieComment[] = [];
    private averageRating: AverageRatingResponse;
    private people: MoviePeopleResponse;
    private providers: MovieProvider[]
    private currentUserRating: number;

    constructor() {
    }

    addComment(comment: MovieComment): void {
        this.comments.push(comment)
    }

    getComments(): MovieComment[] {
        return this.comments;
    }

    setAverageRating(averageRating: AverageRatingResponse): void {
        this.averageRating = averageRating;
    }

    getAverageRating() {
        return this.averageRating;
    }

    setProviders(movieProviders: MovieProvider[]) {
        this.providers = movieProviders;
    }

    getProviders(): MovieProvider[] {
        return this.providers;
    }

    setPeople(people: MoviePeopleResponse): void {
        this.people = people;
    }

    getPeople(): MoviePeopleResponse {
        return this.people;
    }

    setCurrentUserRating(rating: number) {
        this.currentUserRating = rating;
    }
}

export { MovieDetails }