import { axiosApi } from "./AxiosInstance";

interface Person {
    name: string;
}

interface MovieCast extends Person{}

interface MovieDirector extends Person{}

interface MovieWriter extends Person{}

export interface MoviePeopleResponse {
    cast: MovieCast[];
    directors: MovieDirector[];
    writers: MovieWriter[];
}

async function getMovieCastAndDirectors(movieId: number): Promise<MoviePeopleResponse> {
    try {
        const result = await axiosApi.get(`/movie/${movieId}/credits`)
        const castResult = result.data.cast.length > 4 ? result.data.cast.slice(0, 4) : result.data.cast
        let directorsResult = result.data.crew.filter(person => person.job == "Director")

        let writersResult = result.data.crew.filter(person => person.job == "Writer")

        if (writersResult.length == 0) {
            writersResult = result.data.crew.filter(person => person.department == "Writing")
        }

        let writersArray: MovieWriter[] = []
        writersResult.map(writer => writersArray.push({name: writer.name}))
        
        if (directorsResult.length > 4) {
            directorsResult = directorsResult.slice(0, 4)
        }

        let castArray: MovieCast[] = []
        if (castResult) {
            castResult.map(person => {
                castArray.push({name: person.name})
            })
        }
        
        let directorsArray: MovieDirector[] = []
        
        if (directorsResult) {
            directorsResult.map(person => {
                directorsArray.push({name: person.name})
            })
        }      

        const response: MoviePeopleResponse = {
            cast: castArray,
            directors: directorsArray,
            writers: writersArray
        }

        return response;
    } catch (error) {
        console.log(error)
        throw new Error("Erro ao pegar informações do filme com id " + movieId + ".")
    }
}

export { getMovieCastAndDirectors }