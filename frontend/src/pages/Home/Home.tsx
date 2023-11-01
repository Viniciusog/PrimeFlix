import CarrosselFilmes from "../../components/CarrosselFilmes";

import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Home.css";
import { useContext, useEffect } from "react";
import API from "../../sources/axios";
import { FavoriteContext } from "../../contexts/FavoriteContext";

/*const DivTop1 = styled.div<{ url: string | undefined }>`
	background-image: url(${(props) =>
		`https://image.tmdb.org/t/p/original/${props.url}`});
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
`;*/

function Home() {
	const {favoriteMovies} = useContext(FavoriteContext)

	useEffect(() => {
		console.log("Home - faovrite movies: ", favoriteMovies)
	}, [favoriteMovies])
	
	useEffect(() => {
		localStorage.getItem("ACCESS_TOKEN") != null &&
			API.get("/profile", {
				headers: {
					Authorization: `${localStorage.getItem("ACCESS_TOKEN")}`,
				},
			}).then((res) => {
				console.log("Home - then - favorite movies: ", favoriteMovies)
				console.log("response/profile", res);
				localStorage.setItem(
					"generoFavorito",
					String(res.data.favoriteMovieGenre?.id)
				);
			});
	}, []);
	//const [data] = useFetch<IFilme[]>("movie/popular", "results");
	//const top1 = data && data[0];

	return (
		<>
			{/*
			<DivTop1 className="ContainerTop1" url={top1?.poster_path}>
				<h1 className="tituloTop1">{`#1 da Semana: ${top1?.title}`}</h1>
	</DivTop1> */}

			<div className="containerHome">
				<h1 style={{ color: " #DFA83E" }} onClick={() => {
					console.log("on click: ", favoriteMovies)
				}}>O que você quer assistir hoje?</h1>
				<div>
					<h2 className="h2Home">{">"} Os favoritos da semana</h2>
					<CarrosselFilmes url="trending/movie/week" page="1" TMDB />
				</div>
				<div>
					<h2 className="h2Home">{">"} Em Cartaz</h2>
					<CarrosselFilmes url="movie/now_playing" TMDB />
				</div>

				{localStorage.getItem("ACCESS_TOKEN") ? (
					<div>
						<h2 className="h2Home">{">"} Feito para você</h2>
						<CarrosselFilmes url="movie/popular" TMDB={false} />
					</div>
				) : (
					<div className="corTitulo logar">
						<p>Faça login e crie sua própria lista com seus filmes favoritos</p>
						<button className="btnLogar">
							<Link to="/login">Fazer Login</Link>
						</button>
					</div>
				)}

				<div>
					<h2 className="h2Home">{">"} O melhor do cinema</h2>
					<CarrosselFilmes url="movie/popular" TMDB />
				</div>
			</div>
		</>
	);
}

export default Home;
