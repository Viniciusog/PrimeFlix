import "./PerfilUsuario.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { removeFavoriteState } from "../../sources/logoutRemoveFavorite";
import { FavoriteContext } from "../../contexts/FavoriteContext";
import { useContext } from 'react'

const PerfilUsuario = () => {
	const navigate = useNavigate();
	const favoriteContext = useContext(FavoriteContext)

	function logout() {
		localStorage.removeItem("ACCESS_TOKEN");
		localStorage.removeItem('FAVORITE_MOVIES');
		removeFavoriteState(favoriteContext)
		navigate("/login");
	}

	return (
		<div id="containerFlexPerfil">
			<div id="containerPerfil">
				<div id="conteudoPerfil">
					<h1>Seu Perfil</h1>
					<button className="btnPerfil">
						<Link to="/EditarPerfil">Editar Perfil</Link>
					</button>
					<button className="btnPerfil">
						<Link to="/redefinirSenha">Alterar Senha</Link>
					</button>
					<button className="btnPerfil">
						<Link to="/favoritos">Meus Favoritos</Link>
					</button>
					<button onClick={logout} className="btnPerfil">
						Sair
					</button>
				</div>
			</div>
		</div>
	);
};

export default PerfilUsuario;
