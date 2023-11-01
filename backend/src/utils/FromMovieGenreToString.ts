interface IMovieGenre {
    id: number;
    name: string;
}

const genresMap = new Map<number, string>([
    [28, "Ação"],
    [12, "Aventura"],
    [16, "Animação"],
    [35, "Comédia"],
    [80, "Crime"],
    [99, "Documentário"],
    [18, "Drama"],
    [10751, "Família"],
    [14, "Fantasia"],
    [36, "História"],
    [27, "Terror"],
    [10402, "Música"],
    [9648, "Mistério"],
    [10749, "Romance"],
    [878, "Ficção científica"],
    [10770, "Cinema TV"],
    [53, "Thriller"],
    [10752, "Guerra"],
    [37, "Faroeste"],
]);

function fromMovieGenreToString(movieGenre: number) {
    return genresMap.get(movieGenre)
}

export { fromMovieGenreToString }