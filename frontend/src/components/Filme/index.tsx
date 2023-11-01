import { AiFillStar, AiFillHeart } from "react-icons/ai";
import "./Filme.css";
import { IFilme } from "../../types/IFilme";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";
import API from "../../sources/axios";
import { useContext, useState } from "react";
import { FavoriteContext } from "../../contexts/FavoriteContext";
import LoadingModal from "../LoadingModal";
//import { is } from "immer/dist/internal.js";
//import { reach } from "yup";

const TxtContainer = styled.div<{ layout_coluna: boolean }>`
	width: 100%;
	margin: 0px 10px;
	max-height: 176px;
`;

const ImgContainer = styled.div<{ url: string; layout_coluna: boolean }>`
	display: flex;
	justify-content: end;
	width: ${(props) => (props.layout_coluna ? "100%" : "9em")};
	height: ${(props) => (props.layout_coluna ? "266px" : "14em")};
	background-repeat: no-repeat;
	background-position: center;
	background-image: url(${(props) =>
		`https://image.tmdb.org/t/p/w500/${props.url}`});
	background-size: cover;
	border-radius: 5px 10px 5px 10px;
	box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.14);
	flex-shrink: 0;
`;

const Filme = ({
	vote_average,
	poster_path,
	release_date,
	title,
	layout_coluna,
	id,
}: IFilme) => {
	const {favoriteMovies, addFavorite, removeFavorite} = useContext(FavoriteContext)
	const location = useLocation();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false)

	async function clickEstrela() {
		setIsLoading(true)
		console.log("CLICK ESTRELA")
		if (favoriteMovies.includes(id)) {
			console.log("Contém filme, removendo os favoritos...")
			await removerFilme().finally(() => {
				setIsLoading(false)
			})
		} else {
			console.log("Não contém filme, adicionando nos favoritos...")
			await adicionarFilme().finally(() => {
				setIsLoading(false)
			})
		}
		setIsLoading(false)
		mudarFavoritos()
	}

	async function removerFilme() {
		await API.delete(
			`movies/favorite/${id}`,
			{
				headers: {
					Authorization: `${localStorage.getItem("ACCESS_TOKEN")}`,
				},
			}
		)
		.then((res) => {
			removeFavorite(id)
			console.log(res);
		})
		.catch((e) => console.log(e));
	}

	async function adicionarFilme() {
		await API.post(
			"movies/favorite",
			{
				movieId: id,
			},
			{
				headers: {
					Authorization: `${localStorage.getItem("ACCESS_TOKEN")}`,
				},
			}
		)
		.then((res) => {
			addFavorite(id)
			console.log(res);
		})
		.catch((e) => console.log(e));
	}

	function mudarFavoritos() {
		if (location.pathname != "/favoritos") {
			navigate("/favoritos");
		} 
	}

	return (
			<div style={{marginTop:'2em'}}
				className={`${layout_coluna ? "filmeColuna" : "filmeLinha"} cursor`}
				onClick={(e) => {console.log(String(e.target)); String(e.target) == "[object HTMLDivElement]" ? navigate(`/detalhesFilme/${id}`): null}
				}
			>
				<ImgContainer  url={poster_path} layout_coluna={layout_coluna} defaultValue={"https://lojaschluck.com.br/wp-content/uploads/2020/05/ops.png"}>
						<LoadingModal isOpen={isLoading}/>
						{layout_coluna ? (
							<div onClick={clickEstrela}>
								<AiFillStar size={25} className="iconeColuna cursor" color={favoriteMovies.includes(id) ? "yellow" : "white"} />
							</div>					
						) : undefined}		
				</ImgContainer>
				<TxtContainer layout_coluna={layout_coluna}>
					<h3 className="tituloFilme">{title}</h3>
					<h3 className="tituloFilme">
						{`${release_date.split("-")[0]} | ${parseFloat(
							vote_average?.toFixed(1)||'0'
						)}`}
						<AiFillHeart
							className={layout_coluna ? "iconeColuna" : "iconeLinha"}
							color="var(--extra)"
						/>
					</h3>
				</TxtContainer>
			</div>
	);
};

export default Filme;
