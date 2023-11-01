import { RiAccountCircleFill } from "react-icons/ri";
import { HiThumbUp } from "react-icons/hi";
import "./CardComentario.css";
import { IComentario } from "../../../types/IComentario";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../sources/axios";
import LoadingModal from "../../LoadingModal";
import { MessageModal } from "../../MessageModal";

interface Props {
	comentario: IComentario;
}

const CardComentario = ({comentario}: Props) => {
	const { id } = useParams();

	const [deuLike, setDeuLike] = useState<boolean>(comentario.likedByCurrentUser || false);
	const [qtdLikes, setQtdLikes] = useState(comentario.likes);

	const [isLoadingToo, setIsLoadingToo] = useState<boolean>(false)
	const [messageModalIsOpen, setMessageModalIsOpen] = useState<boolean>(false)

	useEffect(() => {
		setDeuLike(comentario.likedByCurrentUser)
	}, [])

	useEffect(() => {
		API.get(`/movies/${id}/comments/${comentario.id}/totalLikes`)
			.then((res) => {
				setQtdLikes(Number(res.data.totalLikes)) 
			})
			.catch((erro) => console.log(erro))
			.finally(() => {
			});
	}, [deuLike]);

	function DarLike() {
		setIsLoadingToo(true)
		API.post(
			`/movies/${id}/comments/${comentario.id}/like
		`,
			{},
			{
				headers: {
					Authorization: `${localStorage.getItem("ACCESS_TOKEN")}`,
				},
			}
		)
		.then((res) => {
			console.log(res);
			setDeuLike(true);
		})
		.catch((e) => console.log(e.message))
		.finally(() => {
			setIsLoadingToo(false)
		});
	}

	function Dislike() {
		setIsLoadingToo(true)
		API.post(
			`/movies/${id}/comments/${comentario.id}/dislike`,
			{},
			{
				headers: {
					Authorization: `${localStorage.getItem("ACCESS_TOKEN")}`,
				},
			}
		)
		.then((res) => {
			console.log(res);
			setDeuLike(false);
		})
		.catch((e) => console.log(e))
		.finally(() => {
			setIsLoadingToo(false)
		});
	}

	function mudarLike() {
		if (localStorage.getItem("ACCESS_TOKEN") != null) {
			if (deuLike) {
				Dislike();
			} else {
				DarLike();
			}
		} else {
			setMessageModalIsOpen(true)
		}
	}


	function formatarData(data: Date) {
		if (!data) {
			return data
		}
		const value = data.toString().split("-")
		value[2] = value[2].substring(0, 2)
		const formatado = value[2] + "/" + value[1] + "/" + value[0]
		return formatado;
	}

	function onClose() {
		setMessageModalIsOpen(false)
	}

	return (
		<div className="CardContainer">
			<MessageModal onClose={onClose} message={"É necessário estar logado para curtir um comentário."} open={messageModalIsOpen}/>
			<LoadingModal isOpen={isLoadingToo}/>
			<div>
				<RiAccountCircleFill
					color={"#FF6600"}
					size={40}
					style={{ margin: "0px 5px" }}
				/>
			</div>
			<div>
				<div>
					<h1 className="tituloCard">{comentario.userName}</h1>
					<h4 className="tituloCard">{formatarData(comentario.date)}</h4>
				</div>
				<div>
					<p>{comentario.content}</p>
				</div>
				<span
					className={`${
						deuLike ? "likeCor" : "dislikeCor"
					}`}
					onClick={() => mudarLike()}
				>
					
					<HiThumbUp
						size={25}
						style={{
							cursor: `${
								localStorage.getItem("ACCESS_TOKEN") != null
									? "pointer"
									: "default"
							}`,
						}}
					/>

					<span style={{ color: "rgba(17, 17, 17, 0.68)", margin: "0px 3px" }}>
						Curtir {qtdLikes}
					</span>
				</span>
			</div>
		</div>
	);
};

export default CardComentario;
