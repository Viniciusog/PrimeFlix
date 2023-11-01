import "./Cadastro.css";
import { useState } from "react";
import { IDadosForm } from "../../types/IDadosForm";
import { useNavigate } from "react-router-dom";
import API from "../../sources/axios";
import * as yup from "yup";
import LoadingModal from "../../components/LoadingModal";

const Cadastro = () => {
	const dadosVazio: IDadosForm = {
		email: "",
		password: "",
		confirmEmail: "",
		confirmPassword: "",
		name: "",
		genero: "F",
		dayB: "",
		monthB: "",
		yearB: "",
		favoriteMovie: "",
		styleFavoriteMovie: "28",
	};

	const navigate = useNavigate();

	const cadastroSchema = yup.object().shape({
		email: yup
			.string()
			.trim()
			.email("Digite um email válido!")
			.required("O campo é obrigatório"),
		password: yup
			.string()
			.trim()
			.required("O campo é obrigatório ")
			.min(6, "Mínimo 6 caracteres"),
		confirmEmail: yup
			.string()
			.trim()
			.email("Digite um email válido!")
			.required("O campo é obrigatório")
			.oneOf(
				[yup.ref("email")],
				"Campos confirmar email e email devem ser iguais"
			),
		confirmPassword: yup
			.string()
			.trim()
			.required()
			.min(6, "Mínimo 6 caracteres")
			.oneOf(
				[yup.ref("password")],
				"Campos confirmar senha e senha devem ser iguais"
			),
		name: yup.string().trim().required("O campo é obrigatório"),
		genero: yup.string().trim().required("O campo é obrigatório"),
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
		styleFavoriteMovie: yup.string().trim().required("O campo é obrigatório"),
	});

	const [dadosForm, setDadosForm] = useState<IDadosForm>(dadosVazio);

	const [erroEmail, setErroEmail] = useState("");
	const [erroSenha, setErroSenha] = useState("");
	const [erroConfirmarEmail, setErroConfirmarEmail] = useState("");
	const [erroConfirmarSenha, setErroConfirmarSenha] = useState("");
	const [erroNome, setErroNome] = useState("");
	const [erroDiaNasc, setErroDiaNasc] = useState("");
	const [erroMesNasc, setErroMesNasc] = useState("");
	const [erroAnoNasc, setErroAnoNasc] = useState("");
	const [erroFilmeFav, setErroFilmeFav] = useState("");
	const [erroEstiloFilmeFav, setErroEstiloFilmeFav] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [signedUp, setSignedUp] = useState(false);

	function limpar() {
		setDadosForm({ ...dadosVazio });
		setErroEmail("");
		setErroSenha("");
		setErroConfirmarEmail("");
		setErroConfirmarSenha("");
		setErroNome("");
		setErroDiaNasc("");
		setErroAnoNasc("");
		setErroMesNasc("");
		setErroFilmeFav("");
		setErroEstiloFilmeFav("");
	}

	async function cadastrar() {
		setIsLoading(true);
		await API.post("/register", {
			email: dadosForm.email,
			password: dadosForm.password,
			name: dadosForm.name,
			gender: dadosForm.genero,
			favoriteMovieGenre: dadosForm.styleFavoriteMovie,
			birthday: `${dadosForm.yearB}-${dadosForm.monthB}-${dadosForm.dayB}`,
			favoriteMovie: dadosForm.favoriteMovie,
		})
			.then(() => {
				setSignedUp(true);
			})
			.catch((error) => console.log(error))
			.finally(() => {
				setIsLoading(false);
			});
	}
	async function handleSubmit() {
		setIsLoading(true);
		await cadastroSchema
			.validate(
				{
					email: dadosForm.email,
					password: dadosForm.password,
					confirmEmail: dadosForm.confirmEmail,
					confirmPassword: dadosForm.confirmPassword,
					name: dadosForm.name,
					genero: dadosForm.genero,
					dayB: dadosForm.dayB,
					monthB: dadosForm.monthB,
					yearB: dadosForm.yearB,
					favoriteMovie: dadosForm.favoriteMovie,
					styleFavoriteMovie: dadosForm.styleFavoriteMovie,
				},
				{ abortEarly: false }
			)
			.then(async () => {
				dadosForm.name != " " &&
					dadosForm.favoriteMovie != " " &&
					(await cadastrar());
				limpar();
			})
			.catch((erros: yup.ValidationError) => {
				erros.inner.forEach((erro) => {
					if (erro.path === "email") setErroEmail(erro.message);
					if (erro.path === "password") setErroSenha(erro.message);
					if (erro.path === "confirmEmail") setErroConfirmarEmail(erro.message);
					if (erro.path === "confirmPassword")
						setErroConfirmarSenha(erro.message);
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
				setIsLoading(false);
			});
	}

	if (!signedUp) {
		return (
			<div id="containerFlexCadastro">
				<LoadingModal isOpen={isLoading} />
				<div id="containerCadastro">
					<h1 className="titleFont size">Cadastre-se</h1>
					<p style={{marginLeft: '2%'}}>É rápido e fácil</p>
					<form action="">
						<div className="grupoInput">
							<div className="grupoInputFilho">
								<label htmlFor="email">* E-mail</label>
								<div className="textBoxCadastro">
									<input
										className="inputCadastro"
										type="text"
										name=""
										id="email"
										placeholder="exemplo@gmail.com"
										value={dadosForm.email}
										required
										onChange={(event) =>
											setDadosForm({ ...dadosForm, email: event.target.value })
										}
										onKeyDown={() => setErroEmail(" ")}
									/>
								</div>
								<span className="spanFormErro">{erroEmail}</span>
							</div>

							<div className="grupoInputFilho">
								<label htmlFor="confirmarEmail">* Confirmar E-mail</label>
								<div className="textBoxCadastro">
									<input
										type="text"
										className="inputCadastro"
										name=""
										id="confirmarEmail"
										placeholder="exemplo@gmail.com"
										value={dadosForm.confirmEmail}
										required
										onChange={(event) =>
											setDadosForm({
												...dadosForm,
												confirmEmail: event.target.value,
											})
										}
										onKeyDown={() => setErroConfirmarEmail(" ")}
									/>
								</div>
								<span className="spanFormErro">{erroConfirmarEmail}</span>
							</div>
						</div>

						<div className="grupoInput">
							<div className="grupoInputFilho">
								<label htmlFor="senha">* Senha</label>
								<div className="textBoxCadastro">
									<input
										className="inputCadastro"
										type="password"
										name=""
										id="senha"
										value={dadosForm.password}
										required
										onChange={(event) =>
											setDadosForm({
												...dadosForm,
												password: event.target.value,
											})
										}
										onKeyDown={() => setErroSenha("")}
									/>
								</div>

								<span className="spanFormErro">{erroSenha}</span>
							</div>

							<div className="grupoInputFilho">
								<label htmlFor="confirmarSenha">* Confirmar Senha</label>
								<div className="textBoxCadastro">
									<input
										className="inputCadastro"
										type="password"
										name=""
										id="confirmarSenha"
										value={dadosForm.confirmPassword}
										required
										onChange={(event) =>
											setDadosForm({
												...dadosForm,
												confirmPassword: event.target.value,
											})
										}
										onKeyDown={() => setErroConfirmarSenha("")}
									/>
								</div>
								<span className="spanFormErro">{erroConfirmarSenha}</span>
							</div>
						</div>

						<div className="grupoInput">
							<div className="grupoInputFilho">
								<label htmlFor="nome">* Nome completo</label>
								<div className="textBoxCadastro">
									<input
										className="inputCadastro"
										type="text"
										name=""
										id="nome"
										value={dadosForm.name}
										onChange={(event) =>
											setDadosForm({ ...dadosForm, name: event.target.value })
										}
										onKeyDown={() => setErroNome("")}
									/>
								</div>
								<span className="spanFormErro">{erroNome}</span>
							</div>

							<div id="containerFlexRadio" className="grupoInputFilho">
								<div className="grupoInputFilho">
									<label htmlFor="feminino">* Gênero</label>
									<div className="containerRadio textBox">
										<label htmlFor="feminino">Feminino</label>
										<input
											className="inputCadastro"
											type="radio"
											name="genero"
											id="feminino"
											value="F"
											checked={dadosForm.genero === "F"}
											onChange={(event) =>
												setDadosForm({
													...dadosForm,
													genero: event.target.value,
												})
											}
										/>
									</div>
								</div>

								<div className="grupoInputFilho">
									<label style={{ opacity: "0" }}>* Gênero</label>
									<div className="containerRadio textBox">
										<label htmlFor="masculino">Masculino</label>
										<input
											className="inputCadastro"
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
						</div>

						<div style={{ maxWidth: "100%" }}>
							<div>
								<label
									id="labelDataNasc"
									htmlFor="dia"
									className="grupoInputFilho"
								>
									* Data de Nascimento <span> </span>
									<span className="spanFormErro">
										{erroDiaNasc || erroMesNasc || erroAnoNasc}
									</span>
								</label>
							</div>
							<div id="containerData">
								<input
									type="number"
									name=""
									id="dia"
									min={1}
									max={31}
									value={dadosForm.dayB}
									placeholder="dia"
									required
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
									value={dadosForm.monthB}
									placeholder="mês"
									required
									onChange={(event) =>
										setDadosForm({ ...dadosForm, monthB: event.target.value })
									}
									onClick={() => setErroMesNasc("")}
								/>

								<input
									type="number"
									name=""
									id="ano"
									min={1900}
									max={2023}
									className="alinharEmbaixo"
									value={dadosForm.yearB}
									placeholder="ano"
									required
									onChange={(event) =>
										setDadosForm({ ...dadosForm, yearB: event.target.value })
									}
									onClick={() => setErroAnoNasc("")}
								/>
							</div>
						</div>

						<div className="grupoInput">
							<div className="grupoInputFilho">
								<label htmlFor="filmeFavorito">* Filme favorito</label>
								<div className="textBoxCadastro">
									<input
										type="text"
										className="inputCadastro"
										name=""
										id="filmeFavorito"
										placeholder="ex.: Titanic"
										value={dadosForm.favoriteMovie}
										required
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
								<label htmlFor="estilofilmeFavorito">
									* Gênero favorito
								</label>
								<select
									name=""
									value={dadosForm.styleFavoriteMovie}
									required
									onChange={(event) => {
										setDadosForm({
											...dadosForm,
											styleFavoriteMovie: event.target.value,
										});
									}}
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

						<div id="containerBtnsForm">
							<button
								id="btnCadastrar"
								className="button"
								onClick={async (event) => {
									event.preventDefault();
									await handleSubmit();
								}}
							>
								Cadastrar
							</button>
							<button
								className="button"
								onClick={(event) => {
									event.preventDefault();
									limpar();
								}}
								id="btnLimpar"
							>
								Limpar
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	} else {
		return (
			<div id="containerFlexCadastro">
				<div
					id="containerCadastro"
					style={{
						marginTop: "5em",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<h2 className="sucess">Verifique seu e-mail para confirmar sua conta.</h2>
					<button
						className="button"
						style={{ marginBottom: "1.3em" }}
						onClick={() => navigate("/login")}
					>
						Fazer login
					</button>
				</div>
			</div>
		);
	}
};

export default Cadastro;
