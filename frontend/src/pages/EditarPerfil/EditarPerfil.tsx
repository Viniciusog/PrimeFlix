import { IDadosForm } from "../../types/IDadosForm";
import "../Cadastro/Cadastro.css";
import "./EditarPerfil.css";
import * as yup from "yup";
import { useEffect, useState } from "react";
import useFetchLocal from "../../hooks/useFetchLocal";
import { RiContactsBookLine } from "react-icons/ri";
import API from "../../sources/axios";
import { toDate } from "date-fns-tz";
import LoadingModal from "../../components/LoadingModal";
import { useNavigate } from "react-router-dom";

/*
{
    "uid": "mqDAneVZRKTIX7fbnJgC7SjetdD3",
    "name": "Vinícius Guimarães",
    "email": "viniciusguimaraes@estudante.ufscar.br",
    "role": "USER",
    "favoriteMoviesIds": [],
    "gender": "M",
    "birthday": "2003-01-30T02:00:00.813Z",
    "favoriteMovie": "Inception",
    "lastLogin": "2023-10-28T00:39:23.336Z",
    "favoriteMovieGenre": {
        "id": 12,
        "name": "Aventura"
    }
}
*/

interface FavoriteMovieGenre {
	id: number;
	name: string;
}

interface UserData {
	uid: string;
	name: string;
	email: string;
	role: string;
	favoriteMoviesIds: [];
	gender: string;
	birthday: string;
	favoriteMovie: string;
	lastLogin: string;
	favoriteMovieGenre: FavoriteMovieGenre;
}

function addZeroFrontOfNumber(value: string): string {
	return value.length < 2 ? "0" + value : value;
}

function getYear(myDate: string): number {
	return Number.parseInt(myDate.substring(0, 4));
}
function getMonth(myDate: string): number {
	return Number.parseInt(myDate.substring(5, 7));
}

function getDay(myDate: string): number {
	return Number.parseInt(myDate.substring(8, 10));
}

const saoPauloTimeZone = "America/Sao_Paulo";

const EditarPerfil = () => {
	const dadosVazio: IDadosForm = {
		email: "",
		password: "",
		confirmEmail: "",
		confirmPassword: "",
		name: "",
		genero: "F",
		dayB: new Date().getDay(),
		monthB: new Date().getMonth(),
		yearB: new Date().getFullYear(),
		favoriteMovie: "",
		styleFavoriteMovie: "28",
	};

	const [dadosForm, setDadosForm] = useState<IDadosForm>(dadosVazio);

	const [data, isLoading] = useFetchLocal<UserData>("/profile");
	const [isLoadingToo, setIsLoadingToo] = useState(false);

	useEffect(() => {
		setIsLoadingToo(true);
		const dataAtualSaoPaulo = toDate(new Date(), {
			timeZone: saoPauloTimeZone,
		});

		dadosVazio.email = data?.email || "";
		dadosVazio.name = data?.name || "";
		dadosVazio.genero = data?.gender || "";
		dadosVazio.dayB = data?.birthday
			? getDay(data.birthday)
			: getDay(dataAtualSaoPaulo.toISOString());
		dadosVazio.monthB = data?.birthday
			? getMonth(data.birthday)
			: getMonth(dataAtualSaoPaulo.toISOString());
		dadosVazio.yearB = data?.birthday
			? getYear(data.birthday)
			: getYear(dataAtualSaoPaulo.toISOString());
		dadosVazio.favoriteMovie = data?.favoriteMovie || "";
		dadosVazio.styleFavoriteMovie =
			data?.favoriteMovieGenre?.id?.toString() || "";

		console.log("Valor date: ", new Date(data?.birthday || "").getMonth());
		console.log("Dados vazios atualizado: ", dadosVazio);

		setDadosForm(dadosVazio);
		setIsLoadingToo(false);
	}, [data]);

	const editarPerfilSchema = yup.object().shape({
		email: yup
			.string()
			.email("Digite um email válido!")
			.required("O campo é obrigatório"),

		name: yup.string().required("O campo é obrigatório"),
		dayB: yup
			.number()
			.typeError("Data inválida")
			.min(1, "Dia : 1 a 31")
			.max(31, "Dia : 1 a 31")
			.required("O campo é obrigatório"),
		monthB: yup
			.number()
			.typeError("Data inválida")
			.min(1, "Mês : 1 a 12")
			.max(12, "Mês : 1 a 12")
			.required("O campo é obrigatório"),
		yearB: yup
			.number()
			.typeError("Data inválida")
			.min(1900, "Ano: Mínimo 1900")
			.required("O campo é obrigatório"),
		favoriteMovie: yup.string().trim().required("O campo é obrigatório"),
		styleFavoriteMovie: yup.string().required("O campo é obrigatório"),
	});

	const [erroEmail, setErroEmail] = useState("");

	const [erroNome, setErroNome] = useState("");
	const [erroDiaNasc, setErroDiaNasc] = useState("");
	const [erroMesNasc, setErroMesNasc] = useState("");
	const [erroAnoNasc, setErroAnoNasc] = useState("");
	const [erroFilmeFav, setErroFilmeFav] = useState("");
	const [erroEstiloFilmeFav, setErroEstiloFilmeFav] = useState("");

	const navigate = useNavigate();

	function handleSubmit() {
		setIsLoadingToo(true);
		console.log("Dados form: ", dadosForm);
		editarPerfilSchema
			.validate(
				{
					email: dadosForm.email,
					name: dadosForm.name,
					dayB: dadosForm.dayB,
					monthB: dadosForm.monthB,
					yearB: dadosForm.yearB,
					favoriteMovie: dadosForm.favoriteMovie,
					styleFavoriteMovie: dadosForm.styleFavoriteMovie,
				},
				{ abortEarly: false }
			)
			.then(async () => {
				await API.put(
					"/profile",
					{
						name: dadosForm.name,
						birthday: new Date(
							`${dadosForm.yearB}-${addZeroFrontOfNumber(
								dadosForm.monthB.toString()
							)}-${addZeroFrontOfNumber(dadosForm.dayB.toString())}`
						),
						gender: dadosForm.genero,
						favoriteMovieGenre: dadosForm.styleFavoriteMovie,
						favoriteMovie: dadosForm.favoriteMovie,
					},
					{
						headers: {
							Authorization: localStorage.getItem("ACCESS_TOKEN"),
						},
					}
				)
					.then((response) => {
						localStorage.setItem(
							"generoFavorito",
							dadosForm.styleFavoriteMovie
						);
						navigate("/");
					})
					.catch((error) => {
						console.log(error);
					})
					.finally(() => {
						setIsLoadingToo(false);
					});
			})
			.catch((erros: yup.ValidationError) => {
				erros.inner.forEach((erro) => {
					if (erro.path === "email") setErroEmail(erro.message);
					if (erro.path === "name") setErroNome(erro.message);
					if (erro.path === "dayB") setErroDiaNasc(erro.message);
					if (erro.path === "monthB") setErroMesNasc(erro.message);
					if (erro.path === "yearB") setErroAnoNasc(erro.message);
					if (erro.path === "favoriteMovie") setErroFilmeFav(erro.message);
					if (erro.path === "styleFavoriteMovie")
						setErroEstiloFilmeFav(erro.message);
				});
			})
			.finally(() => {
				setIsLoadingToo(false);
			});
	}

	return (
		<>
			<div id="containerFlexCadastro">
				<LoadingModal isOpen={isLoading || isLoadingToo} />
				<div id="containerCadastro">
					<form action="">
						<div className="grupoInput">
							<div className="grupoInputFilho">
								<label htmlFor="nome">Nome</label>
								<div className="textBox">
									<input
										className="input"
										type="text"
										id="nome"
										placeholder="Marie Curie"
										value={dadosForm.name}
										onChange={(event) =>
											setDadosForm({ ...dadosForm, name: event.target.value })
										}
										onKeyDown={() => setErroNome(" ")}
									/>
								</div>
								<span className="spanFormErro">{erroNome}</span>
							</div>

							<div className="grupoInputFilho">
								<label htmlFor="E-mail">E-mail</label>
								<div className="textBox">
									<input
										className="input"
										type="text"
										name=""
										id="email"
										disabled
										placeholder="radio&polonio@gmail.com"
										value={dadosForm.email}
										onChange={(event) =>
											setDadosForm({ ...dadosForm, email: event.target.value })
										}
										onKeyDown={() => setErroEmail(" ")}
									/>
								</div>
								<span className="spanFormErro">{erroEmail}</span>
							</div>
						</div>

						<div
							className="grupoInput"
							/* style={{
								maxWidth: "100%",
								//justifyContent: "space-between",
							}} */
						>
							<div
								id="containerFlexRadio"
								className="grupoInputFilho"
								//style={{width: "100%"}}
								//style={{ width: "50%" }}
							>
								<div style={{ width: "100%" }}>
									<label htmlFor="feminino">Gênero</label>
									<div className="containerRadio textBox">
										<label htmlFor="feminino">Feminino</label>
										<input
											className="input"
											checked={dadosForm.genero === "F"}
											type="radio"
											name="genero"
											id="feminino"
											value={"F"}
											onChange={(event) =>
												setDadosForm({
													...dadosForm,
													genero: event.target.value,
												})
											}
										/>
									</div>
								</div>

								<div style={{ width: "100%" }}>
									<label style={{ opacity: "0" }}>* Gênero</label>
									<div className="containerRadio textBox">
										<label htmlFor="masculino">Masculino</label>
										<input
											className="input"
											type="radio"
											name="genero"
											id="masculino"
											value="M"
											checked={dadosForm.genero === "M"}
											onChange={(event) =>
												setDadosForm({
													...dadosForm,
													genero: event.target.value,
												})
											}
										/>
									</div>
								</div>
							</div>

							<div className="grupoInputFilho">
								<label id="labelDataNasc" htmlFor="dia">
									Data de Nascimento
									<span className="spanFormErro" style={{ display: "inline" }}>
										{erroDiaNasc || erroMesNasc || erroAnoNasc}
									</span>
								</label>

								<div id="containerData">
									<input
										type="number"
										name=""
										id="dia"
										min={1}
										max={31}
										placeholder="dia"
										required
										value={dadosForm.dayB}
										onChange={(event) =>
											setDadosForm({ ...dadosForm, dayB: event.target.value })
										}
										onClick={() => setErroDiaNasc("")}
									/>

									<input
										type="number"
										name=""
										id="mes"
										min={1}
										max={12}
										className="alinharEmbaixo"
										placeholder="mês"
										value={dadosForm.monthB}
										required
										onChange={(event) => {
											console.log("Mês: " + event.target.value);
											setDadosForm({
												...dadosForm,
												monthB: Number.parseInt(event.target.value),
											});
										}}
										onClick={() => setErroMesNasc("")}
									/>

									<input
										type="number"
										name=""
										id="ano"
										min={1900}
										max={2023}
										className="alinharEmbaixo"
										placeholder="ano"
										required
										value={dadosForm.yearB || 2023}
										onChange={(event) =>
											setDadosForm({ ...dadosForm, yearB: event.target.value })
										}
										onClick={() => setErroAnoNasc("")}
									/>
								</div>
							</div>
						</div>

						<div className="grupoInput">
							<div className="grupoInputFilho">
								<label htmlFor="nome">Filme favorito</label>
								<div className="textBox">
									<input
										className="input"
										type="text"
										id="filmeFavorito"
										placeholder="Radioactive"
										value={dadosForm.favoriteMovie}
										onChange={(event) =>
											setDadosForm({
												...dadosForm,
												favoriteMovie: event.target.value,
											})
										}
										onKeyDown={() => setErroFilmeFav("")}
									/>
								</div>
								<span className="spanFormErro">{erroFilmeFav}</span>
							</div>

							<div className="grupoInputFilho">
								<label htmlFor="nome">Gênero de filme favorito</label>
								<select
									name=""
									id="generosFilmes"
									className="campoMaior"
									onChange={(event) => {
										setDadosForm({
											...dadosForm,
											styleFavoriteMovie: event.target.value,
										});
									}}
									value={dadosForm.styleFavoriteMovie.toString() || "28"}
									onClick={() => setErroEstiloFilmeFav("")}
								>
									<option value="28">Ação</option>
									<option value="12">Aventura</option>
									<option value="16">Animação</option>
									<option value="35">Comédia</option>
									<option value="80">Crime</option>
									<option value="99">Documentário</option>
									<option value="18">Drama</option>
									<option value="10751">Família</option>
									<option value="14">Fantasia</option>
									<option value="36">História</option>
									<option value="27">Terror</option>
									<option value="10402">Música</option>
									<option value="9648">Mistério</option>
									<option value="10749">Romance</option>
									<option value="878">Ficção Científica</option>
									<option value="10770">Cinema TV</option>
									<option value="53">Thriller</option>
									<option value="10752">Guerra</option>
									<option value="37">Faroeste</option>
								</select>
								<span className="spanFormErro">{erroEstiloFilmeFav}</span>
							</div>
						</div>
						<div className="grupoInput noGap">
							<div id="containerBtnsForm">
								<button
									className="button"
									onClick={(event) => {
										event.preventDefault();
										handleSubmit();
									}}
									id="btnSalvar"
								>
									Salvar
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default EditarPerfil;
