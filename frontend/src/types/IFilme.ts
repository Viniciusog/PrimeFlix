interface IGenero{
    id: number,
    name: string
}

export interface IFilme {
    id: number,
    vote_average: number,
    poster_path: string,
    release_date: string,
    title: string,
    original_title?: string
    genres: IGenero[];
    overview: string;
    runtime: number;
    layout_coluna : boolean,
}

export interface IFilmeLocal {
    genres: IGenero[];
    id: number;
    title: string;
    originalTitle: string;
    overview: string;
    runtime: number;
    releaseDate: string;
    posterPath: string;
    layout_coluna: boolean;
    voteAverage: number;
}