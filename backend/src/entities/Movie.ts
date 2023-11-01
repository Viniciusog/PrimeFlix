/* interface Movie {
    id: number;
    name: string;
    comments?: Comment[];
    ratings?: Rating[];
  } */

import { AverageRatingResponse } from "../services/rating/getAverageRating";
import { MovieComment } from "./MovieComment";
import { MovieGenre } from "./MovieGenre";
import { MovieRating } from "./MovieRating";

/** Classe que representa os valores básicos que pegamos de um filme pelo TMDB */
class Movie {
    private id: number;
    private title: string;
    private originalTitle: string;
    private posterPath: string;
    private releaseDate: Date;
    private overview: string;
    private runtime: number;
    private genres: MovieGenre[] = [];
    private comments: MovieComment[];
    private voteAverage: number;
  
    constructor(id: number, title: string = "") {
      this.id = id;
      this.title = title;
    }

    setVoteAverage(voteAverage: number) {
      this.voteAverage = voteAverage;
    }

    getVoteAverage(): number {
      return this.voteAverage;
    }

    addComment(comment: MovieComment) {
      this.comments.push(comment)
    }

    getComments(): MovieComment[] {
      return this.comments;
    }

    /* addRating(rating: MovieRating) {
      this.ratings.push(rating)
    } */
  
    getId(): number {
      return this.id;
    }
  
    setId(id: number): void {
      this.id = id;
    }
  
    getTitle(): string {
      return this.title;
    }
  
    setTitle(title: string): void {
      this.title = title;
    }

    getOriginalTitle(): string {
      return this.originalTitle;
    }
  
    setOriginalTitle(originalTitle: string): void {
      this.originalTitle = originalTitle;
    }

    getOverview(): string {
      return this.overview;
    }
  
    setOverview(overview: string): void {
      this.overview = overview;
    }

    getPosterPath(): string {
      return this.posterPath;
    }
  
    setPosterPath(posterPath: string): void {
      this.posterPath = posterPath;
    }

    getReleaseDate(): Date {
      return this.releaseDate;
    }
  
    setReleaseDate(releaseDate: Date): void {
      this.releaseDate = releaseDate;
    }

    getRuntime(): number {
      return this.runtime;
    }

    setRuntime(runtime: number): void {
      this.runtime = runtime;
    }

    addGenre(genre: MovieGenre) {
      this.genres.push(genre)
    }

    getGenres(): MovieGenre[] {
      return this.genres;
    }
}

export { Movie }