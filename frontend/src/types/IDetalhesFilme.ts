import { IComentario } from "./IComentario";
import { IFilme } from "./IFilme";

/**
 * "id": 2,
            "logoPath": "/peURlLlr8jggOwK53fJ5wdQl05y.jpg",
            "name": "Apple TV",
            "categories": [
                "BUY",
                "RENT"
            ]
 */

type ProviderCategory = 'BUY' | 'RENT' 

export interface Provider {
  id: number;
  logoPath: string;
  name: string;
  categories: ProviderCategory[]
}

export interface Person {
  name: string;
}

export interface IDetalhesFilme {
  averageRating?: {average: number, totalRatings: number},
  comments : IComentario[],
  people?: {cast: Person[], directors: Person[], writers: Person[]},
  providers?: Provider[]
  currentUserRating?: number,
}