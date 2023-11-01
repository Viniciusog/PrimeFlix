import { RiAccountCircleFill } from "react-icons/ri";
import CardComentario from "./CardComentario";
import "./Comentario.css";
import { IComentario } from "../../types/IComentario";

const Comentario = (comentarios: IComentario[]) => {
	return (
		<div>
			<h3 className="titulo">
				{comentarios.length} Comentário{comentarios.length > 1 ? "s" : ""}
			</h3>
			<hr />
			<div className="ContainerInputComentario">
				<span style={{ margin: "0px 5px" }}>
					<RiAccountCircleFill size={40} color={"#564438"} />{" "}
				</span>
				<input
					className="inputComentario"
					type="text"
					placeholder="Deixe seu comentário aqui"
				/>
			</div>
			<div>
				{comentarios.map((comentario, index) => (
					<CardComentario key={index} comentario={comentario} />
				))}
			</div>
		</div>
	);
};

export default Comentario;
