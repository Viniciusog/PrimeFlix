import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./CardAvaliacao.css";
import { useEffect, useState } from "react";
import API from "../../../sources/axios";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
	titulo: string;
	tipo: "usuario" | "avaliar";
	mediaAvaliacoes: number;
	totalAvaliacoes: number;
}

const CardAvaliacaoUsuario = ({
	tipo,
	titulo,
	mediaAvaliacoes,
	totalAvaliacoes,
}: Props) => {
	const { id } = useParams();
	const [selecionado, setSelecionado] = useState(-1);
	const navigate = useNavigate();
	const [userRating, setUserRating] = useState<number>(0);
	const [avaliado, setAvaliado] = useState<boolean>();

	useEffect(() => {
		API.get(`/movies/${id}/currentUserRating`, {
			headers: {
				Authorization: `${
					localStorage.getItem("ACCESS_TOKEN") != null
						? localStorage.getItem("ACCESS_TOKEN")
						: ""
				}`,
			},
		})
			.then((res) => {
				res.data?.currentUserRating
					? setUserRating(res.data.currentUserRating)
					: setUserRating(0);
				setAvaliado(userRating != 0);
				setSelecionado(userRating - 1);
			})
			.catch((e) => console.log(e));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [avaliado]);

	function mudarIcone(index: number) {
		if (tipo == "avaliar") setSelecionado(index);
	}

	function avaliar() {
		localStorage.getItem("ACCESS_TOKEN") != null &&
			API.post(
				"/movies/ratings",
				{
					movieId: id,
					hearts: selecionado + 1,
				},
				{
					headers: {
						Authorization: `${localStorage.getItem("ACCESS_TOKEN")}`,
					},
				}
			).then((res) => {
				console.log(res);
				setAvaliado(true);
				navigate(0);
			})
			.catch((erro) => console.log(erro));
	}

	return (
		<div className="cardAvaliacao">
			<h2>{titulo}</h2>
			<div className="Avaliacao">
				<span>{`${
					tipo === "avaliar" ? selecionado + 1 : Math.floor(mediaAvaliacoes)
				}/10`}</span>

				<div>
					{Array(10)
						.fill(true)
						.map((item, index) => (
							<span
								onClick={() => tipo == "avaliar" && avaliar()}
								onMouseOut={() =>
									userRating != 0 && setSelecionado(userRating - 1)
								}
								key={index}
								onMouseOver={() =>
									localStorage.getItem("ACCESS_TOKEN") != null &&
									mudarIcone(index)
								}
							>
								{tipo === "avaliar" ? (
									index <= selecionado ? (
										<AiFillHeart size={30} color={"var(--extra)"} />
									) : (
										<AiOutlineHeart size={30} color="#C8C8C8" />
									)
								) : index + 1 <= mediaAvaliacoes ? (
									<AiFillHeart size={30} color={"var(--extra)"} />
								) : (
									<AiOutlineHeart size={30} color="#C8C8C8" />
								)}
							</span>
						))}
				</div>
			</div>
			<span className="spanAvaliacao">
				{tipo === "usuario" ? `${totalAvaliacoes} avaliações` : selecionado + 1}
			</span>
		</div>
	);
};

export default CardAvaliacaoUsuario;
