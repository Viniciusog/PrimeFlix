import "./DetalhesFilme.css";
import "../../components/Comentario/Comentario.css";
import CardAvaliacao from "./CardAvaliacao/index";
import { RiAccountCircleFill, RiContactsBookUploadLine } from "react-icons/ri";
import CardDetalhesFilme from "./CardDetalhesFilme";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../sources/axios";
import { IDetalhesFilme } from "../../types/IDetalhesFilme";
import CardComentario from "../../components/Comentario/CardComentario";
import LoadingModal from "../../components/LoadingModal";
import { IComentario } from "../../types/IComentario";

const DetalhesFilme = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [inputComentario, setInputComentario] = useState<string>();
	
	const dateObj = new Date();
	const currentDate = dateObj.toLocaleString().split(",")[0];
	const elementsDate = currentDate.split("/");

	const [detalhesFilme, setDetalhesFilme] = useState<IDetalhesFilme>({
		averageRating: { average: 0, totalRatings: 0 },
		comments: [],
		people: { cast: [], directors: [], writers: [] },
		providers: [],
		currentUserRating: 0,
	});

	const [comments, setComments] = useState<any[]>([])
	
	const [comentarioEnviado, setComentarioEnviado] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function getMovieDetails(): Promise<void> {
		setIsLoading(true)
		await API.get(`/movies/${id}/details`, {
			headers: {
				Authorization: `${
					localStorage.getItem("ACCESS_TOKEN") != null
						? localStorage.getItem("ACCESS_TOKEN")
						: ""
				}`,
			},
		})
		.then((res) => {
			console.log("res.data.comments")
			console.log(res.data.comments)
			setComments(res.data.comments)
			setDetalhesFilme(res.data);
			console.log("res.data: ", res.data)
			console.log("detalhes filme: ", detalhesFilme)
			console.log(res.data.currentUserRating);
		})
		.catch((e) => console.log(e))
		.finally(() => {
			setIsLoading(false)
		});
	}

	useEffect(() => {
		getMovieDetails()
	}, [])

	async function enviarComentario() {
		setIsLoading(true)
		await API.post(
			`/movies/comments`,
			{
				movieId: id,
				content: inputComentario,
				date: `${elementsDate[2]}-${elementsDate[1]}-${elementsDate[0]}`,
			},
			{
				headers: {
					Authorization: `${localStorage.getItem("ACCESS_TOKEN")}`,
				},
			}
		)
		.then((res) => {
			const myComment = {
				id: res.data.id,
				content: res.data.content,
				date: res.data.date,
				userEmail: res.data.userEmail,
				userName: res.data.userName,
				likes: res.data.likes,
				likedByCurrentUser: res.data.likedByCurrentUser
			}
		
			setComments(prev => [myComment, ...prev])			
			setInputComentario("");
		})
		.catch((erro) => console.log(erro))
		.finally(() => {
			setIsLoading(false)
		});
	}

	return (
		<>
			<span
				className="containerDetalhes spanVoltar"
				onClick={() => navigate(-1)}
			>
				{`< VOLTAR`}
			</span>

			<div className="containerDetalhes containerConteudoDetalhes">
				<LoadingModal isOpen={isLoading}/>
				<CardDetalhesFilme {...detalhesFilme} />
				<div className="containerAvaliacoes">
					<CardAvaliacao
						titulo="Usuários"
						tipo="usuario"
						mediaAvaliacoes={detalhesFilme?.averageRating?.average || 0}
						totalAvaliacoes={detalhesFilme?.averageRating?.totalRatings || 0}
					/>
					<span className="spanAvaliacaoFilme"></span>
					<CardAvaliacao
						titulo="Avaliar"
						tipo="avaliar"
						mediaAvaliacoes={0}
						totalAvaliacoes={0}
					/>
				</div>
				<div>
					<h3 className="titulo">
						{comments?.length} Comentário
						{/* detalhesFilme?.comments?.length && detalhesFilme?.comments?.length */ comments && comments.length > 1 ? "s" : ""}
					</h3>
					<hr/>

					{localStorage.getItem("ACCESS_TOKEN") != null && (
						<div className="ContainerInputComentario">
							<span style={{ margin: "0px 5px" }}>
								<RiAccountCircleFill size={40} color={"#564438"} />{" "}
							</span>
							<input
								id="inputComentarioUser"
								value={inputComentario}
								onChange={(event) => setInputComentario(event.target.value)}
								onKeyUp={async (event) => event.code == "Enter" && await enviarComentario()}
								className="inputComentario"
								type="text"
								placeholder="Deixe seu comentário aqui"
								readOnly={localStorage.getItem("ACCESS_TOKEN") == null}
							/>
						</div>
					)}

					<div>
						{comments?.map((comentario, index) => (
							<CardComentario key={comentario.id} comentario={comentario}/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default DetalhesFilme;
