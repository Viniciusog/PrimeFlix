import { useNavigate, useParams } from "react-router-dom";
import { IFilme } from "../../types/IFilme";
import Filme from "../../components/Filme";
import "./TodosFilmes.css";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../hooks/axiosInstance";
import { Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#C6912C",
		},
	},
});

const TodosFilmes = () => {
	const { url, genero, titulo } = useParams();
	const [page, setPage] = useState("1");
	const [filmes, setFilmes] = useState<IFilme[] | null>();
	const parametros = url && url.split("-");
	const navigate = useNavigate();

	useEffect(() => {
		const genero_id = parametros && parametros[0] === "discover" ? genero : "";
		axiosInstance
			.get(`${parametros && parametros[0]}/${parametros && parametros[1]}`, {
				params: {
					page: page ? page : "1",
					with_genres: genero_id,
				},
			})
			.then((res) => {
				setFilmes(res.data.results);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [page, url, genero]);

	// ordena por ordem alfabética
	parametros &&
		parametros[1] === "popular" &&
		filmes?.sort(function (a, b) {
			if (a.title < b.title) return -1;
			if (a.title > b.title) return 1;
			return 0;
		});

	return (
		<div id="containerTodosFilmes">
			<h2 className="tituloTodosFilmes">
				{titulo
					? titulo === "Cartaz"
						? "Em Cartaz"
						: titulo === "Melhor do Cinema"
						? "Cinema"
						: titulo
					: "Todos os Filmes"}
			</h2>
			<div className="amostraFilme">
				{filmes?.slice(0, 5).map((filme) => (
					<Filme {...filme} layout_coluna key={filme.id} />
				))}
			</div>

			<div className="amostraFilme">
				{filmes?.slice(5, 10).map((filme) => (
					<Filme {...filme} layout_coluna key={filme.id} />
				))}
			</div>

			<div className="amostraFilme">
				{filmes?.slice(10, 15).map((filme) => (
					<Filme {...filme} layout_coluna key={filme.id} />
				))}
			</div>

			<div className="amostraFilme">
				{filmes?.slice(15, 20).map((filme) => (
					<Filme {...filme} layout_coluna key={filme.id} />
				))}
			</div>
			<div style={{display:'flex',justifyContent:'center'}}>
				<ThemeProvider theme={theme}>
					<Pagination
						color="primary"
						count={20}
						onChange={(event, pg) => setPage(pg.toString())}
					/>
				</ThemeProvider>
			</div>
		</div>
	);
};

export default TodosFilmes;
