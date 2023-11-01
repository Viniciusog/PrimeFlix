import styled from "styled-components";
import "./CardDetalhesFilme.css";
import { CiCalendar } from "react-icons/ci";
import { AiFillClockCircle } from "react-icons/ai";
import useFetch from "../../../hooks/useFetch.hook";
import { IRequisicaoProvider } from "../../../types/IProvider";
import { IFilme } from "../../../types/IFilme";
import { ICredito } from "../../../types/ICredito";
import { useParams } from "react-router";
import { IDetalhesFilme, Person } from "../../../types/IDetalhesFilme";

const Poster = styled.img`
	height: 100%;
	border-radius: 15px;
	width: 100%;
	object-fit: contain;
`;

const CardDetalhesFilme = (filme: IDetalhesFilme) => {
	const { id } = useParams();

	const providers = filme.providers;
	const [detalhes] = useFetch<IFilme>(`movie/${id}`)
	const listaGeneros = detalhes && detalhes?.genres;
	
	const listaDiretores = filme.people?.directors;
	const listaEscritores = filme.people?.writers;
	const listaAtores = filme.people?.cast;

	function formatDate(data: string) {
		if (!data) return data
		const result = data.split('-')
		return `${result[2]}/${result[1]}/${result[0]}`
	}

	return (
		<div className="infoContainer">
			<div className="imgInfoContainer">
				<Poster
					src={`https://image.tmdb.org/t/p/original/${detalhes?.poster_path}`}
				/>
			</div>
			<div className="txtInfoContainer">
				<h1 className="corTitulo">{detalhes?.title}</h1>
				<p>{detalhes?.overview}</p>
				<h3 className="corTitulo">{providers ? providers?.length > 0 && 'Assista em' : ''}</h3>
				<div className="imgAssistir">
					{providers?.map((provider) => (
							<img
								className="imgProvider"
								key={provider.id}
								src={`https://image.tmdb.org/t/p/original/${provider.logoPath}`}
								alt={provider.name}
							/>
					))}
				</div>
				<div className="iconesFlexContainer">
					<div className="iconesContainer">
						<CiCalendar size={30} />
						<span>{detalhes?.release_date ? formatDate(detalhes.release_date) : detalhes?.release_date}</span>
					</div>

					<div className="iconesContainer">
						<AiFillClockCircle size={30} color={"#564438"} />
						<span>{detalhes?.runtime}min</span>
					</div>
				</div>
				<div className="divDetalhes">
					<p>
						<span className="corTitulo styledSpan">{listaGeneros ? listaGeneros?.length > 0 && 'Gênero:' : ''}</span>{" "}
						{listaGeneros &&
							listaGeneros.map((genero, index) =>
								index === listaGeneros.length - 1 ? (
									<span key={genero.id}>{genero.name}</span>
								) : (
									<span key={genero.id}>{genero.name}, </span>
								)
							)}
					</p>

					<p>
						<span className="corTitulo styledSpan">{listaDiretores ? listaDiretores?.length > 0 && 'Direção:' : ''}</span>{" "}
						{listaDiretores &&
							listaDiretores.map((diretor, index) =>
								index === listaDiretores.length - 1 ? (
									<span key={index}>{diretor.name}</span>
								) : (
									<span key={index}>{diretor.name}, </span>
								)
							)}
					</p>

					<p>
						<span className="corTitulo styledSpan">{listaEscritores ? listaEscritores?.length > 0 && 'Roteiro:' : ' '}</span>
						{' '}
						{listaEscritores &&
							listaEscritores.map((escritor, index) =>
								index === listaEscritores.length - 1 ? (
									<span key={index}>{escritor.name}</span>
								) : (
									<span key={index}>{escritor.name}, </span>
								)
							)}
					</p>

					<p>
						<span className="corTitulo styledSpan">{listaAtores ? listaAtores?.length > 0 && 'Elenco:' : ''}</span> {" "}
						{listaAtores &&
							listaAtores.map((ator, index) =>
								index === listaAtores.length - 1 ? (
									<span key={index}>{ator.name}</span>
								) : (
									<span key={index}>{ator.name}, </span>
								)
							)}
					</p>

					<p>
						<span className="corTitulo styledSpan">Título Original:</span>{" "}
						{detalhes?.original_title}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CardDetalhesFilme;
