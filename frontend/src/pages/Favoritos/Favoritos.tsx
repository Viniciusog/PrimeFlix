import "./Favoritos.css";
import { HiStar } from "react-icons/hi2";
import Filme from "../../components/Filme";
import { IFilmeLocal, IFilme } from "../../types/IFilme";
import useFetchLocal from "../../hooks/useFetchLocal";
import LoadingModal from "../../components/LoadingModal";
import { useContext } from "react";
import { FavoriteContext } from "../../contexts/FavoriteContext";

function Favoritos() {

	const [data, isLoading] = useFetchLocal<IFilmeLocal[]>("movies/favorite");
	const { favoriteMovies } = useContext(FavoriteContext)
	const myData = data?.filter(value => favoriteMovies.includes(value.id)) || []

	return (
		<div className="favoritos">
			<LoadingModal isOpen={isLoading}/>
			<ul className="title">
				<li className="meusFavoritos">Meus Favoritos</li>
				<li className="star">
					<HiStar />
				</li>
			</ul>
			<div className="moviesContainer">
				{myData &&
					myData.map(
						(filme) => (
							<Filme
								{...filme}
								layout_coluna={true}
								key={filme.id}
								vote_average={filme.voteAverage}
								poster_path={filme.posterPath}
								release_date={filme.releaseDate}
							/>
						)
						//vote_average={0} poster_path={filme.posterPath} release_date={filme.releaseDate}
					)}
			</div>
		</div>
	);
}

export default Favoritos;
