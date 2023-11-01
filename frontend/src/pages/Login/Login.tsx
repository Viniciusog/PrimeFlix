import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as yup from "yup";
import API from "../../../source/axios";
import LoadingModal from "../../components/LoadingModal";
import { useFavoriteMovie } from "../../contexts/FavoriteContext";

const loginSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required().min(8),
});

interface LoginData {
	email: string;
	password: string;
}

function Login() {
	const navigate = useNavigate();
	const {addFavorite, favoriteMovies} = useFavoriteMovie();
	const [isLoading, setIsLoading] = useState(false)
	const [email, setEmail] = useState ('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState ('');
    const [passwordError, setPasswordError] = useState('');
    const [notFound,setNotFound] = useState(false);
	

	async function handleSubmit() {
		setIsLoading(true)
		await loginSchema
			.validate({ email, password }, { abortEarly: false })
			.then(async (dadosValidados: LoginData) => {
				await API.post("/signin", {
					email: dadosValidados.email,
					password: dadosValidados.password,
				})
					.then(async (response) => {
						if (response.data && response.data.token) {
							localStorage.setItem("ACCESS_TOKEN", response.data.token);
							localStorage.setItem("USER_ROLE",response.data.userRole);

							if (response.data.userRole == "USER") {
								await API.get("/movies/favorite", {headers: {Authorization: response.data.token}})
								.then(responseFavoriteMovies => {
									const array : any[] = responseFavoriteMovies.data;
									console.log("RESPONSE FAV MOVIES:");
									console.log(responseFavoriteMovies);
									array?.map(movie => {
										addFavorite(movie.id);
									})
								}).finally(()=>{
									console.log("Meus filmes favoritos: ");
									console.log(favoriteMovies);
									setIsLoading(false);
								});
							}
							
							//window.location.reload();
							if (response.data.userRole == 'USER'){
								navigate ("/")
							}
							else (
								navigate ("/admin")
							)
							
							window.location.reload();
						} else {
							console.error("Tokens não encontrados na resposta da API");
						}
						setIsLoading(false)
					})
					.catch((error) => {
						setIsLoading(false)
						console.log(error.response);
						setNotFound(true);
					})
					.finally(() => {
						console.log("Meus finally filmes favoritos: ");
						console.log(favoriteMovies);
					});
			})
			.catch((errors: yup.ValidationError) => {
				errors.inner.forEach((error: yup.ValidationError) => {
					if (error.path === "email") {
						setEmailError(error.message);
					} else if (error.path === "password") {
						setPasswordError(error.message);
					}
				});
				setIsLoading(false)
			});
	};

	return (
		<div className="loginBox">
			<LoadingModal isOpen={isLoading}/>
			<h2
				className={
					passwordError || emailError
						? "titleFont titlePlacing errorGapLogin"
						: "titleFont titlePlacing"
				}
			>
				Login
			</h2>
			<div className="errorBox">
				<a>
					{notFound && <a className="error">Usuário ou senha incorretos</a>}
				</a>
			</div>
			<div className="content">
				<form>
					<h4 className="text">E-mail</h4>
					<div className="textBox">
						<input
							className="input"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							onKeyDown={() => setEmailError("")}
						/>
					</div>
					<a>{emailError && <a className="error">{emailError}</a>}</a>
					<div className="align">
						<a className="text">Senha</a>
						<a
							className="forgot underline forgot_FontSize"
							onClick={() => navigate("/redefinirSenha")}
						>
							Esqueceu sua senha?
						</a>
					</div>
					<div className="textBox">
						<input
							className="input"
							type="password"
							autoComplete="current-password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							onKeyDown={() => setPasswordError("")}
						/>
					</div>
					<a>{passwordError && <a className="error">{passwordError}</a>}</a>
				</form>

				<button type="submit" onClick={async () => await handleSubmit()} className="entrar button">
					Entrar
				</button>
				<div
					className={
						emailError && passwordError
							? "forgot list_cadastro errorGapCadastro"
							: "forgot list_cadastro"
					}
				>
					<a>Ainda não tem conta?</a>
					<a className="underline" onClick={() => navigate(`/cadastro`)}>
						Cadastre-se
					</a>
				</div>
			</div>
		</div>
	);
}

export default Login;
