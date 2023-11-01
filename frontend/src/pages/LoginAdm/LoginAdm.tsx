import "../Login/Login.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as yup from "yup";
import API from "../../../source/axios";
import styled from "styled-components";
import { width } from "@mui/system";

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

	const [email, setEmail] = useState ('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState ('');
    const [passwordError, setPasswordError] = useState('');
    const [notFound,setNotFound] = useState(false);

	const handleSubmit = () => {
		loginSchema
			.validate({ email, password }, { abortEarly: false })
			.then(async (dadosValidados: LoginData) => {
				await API.post("/signin", {
					email: dadosValidados.email,
					password: dadosValidados.password,
				})
					.then((response) => {
						if (response.data && response.data.token) {
							localStorage.setItem("ACCESS_TOKEN", response.data.token);
							navigate("/");
							window.location.reload();
						} else {
							console.error("Tokens não encontrados na resposta da API");
						}
					})
					.catch((error) => {
						console.log(error.response);
						setNotFound(true);
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
			});
	};

	return (
		<div className="loginBox">
			<h2
				className={
					passwordError || emailError
						? "titleFont titlePlacing errorGapLogin"
						: "titleFont titlePlacing"
				}
                style={{marginTop:"8%"}}
			>
				Painel de Controle
			</h2>
			<div className="content">
				<form style={{width:'65%'}}>
					<h4 className="text">Nome de Usuário</h4>
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
					<h4 className="text">Senha</h4>
					<div className="textBox">
						<input 
							className="input"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							onKeyDown={() => setPasswordError("")}
						/>
					</div>
					<a>{passwordError && <a className="error">{passwordError}</a>}</a>
				</form>
                <div className="errorBox">
                    <a>
                        {notFound && <a className="error">Usuário ou senha incorretos</a>}
                    </a>
			    </div>
				<button 
                    type="submit" 
                    onClick={handleSubmit} 
                    className="entrar button" 
                    style={emailError && passwordError? {marginTop:"2%"}:{marginTop:"8%"}}
                    >
					Entrar
				</button>
			</div>
		</div>
	);
}

export default Login;
