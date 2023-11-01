import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { TiThMenu } from "react-icons/ti";
import { IoMdSearch, IoMdClose } from "react-icons/io";
import { MdFilterListAlt } from "react-icons/md";
import { HiStar } from "react-icons/hi2";
import { RiAccountCircleFill } from "react-icons/ri";
import { BsBookmarkStar } from "react-icons/bs";
import { LuLogIn } from "react-icons/lu";
import React, { useState, useEffect, useContext } from "react";
import { useAuthContext } from "../../contexts/Auth/AuthContext";
import { responsiveFontSizes } from "@mui/material/styles";
import logo from '../../img/PrimeFlix.png'
import { removeFavoriteState } from "../../sources/logoutRemoveFavorite";
import { FavoriteContext, useFavoriteMovie } from "../../contexts/FavoriteContext";

interface props {
	isShown: boolean;
}

export function Navbar({ isShown }: props) {
	const [isShownFilter, setIsShownFilter] = useState(false);
	const [isShownGenerosM, setIsShownGenerosM] = useState(false);
	const [isShownGenerosF, setIsShownGenerosF] = useState(false);

	const [responsiveSearch, setResponsiveSearch] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const [generoFav, setGeneroFav] = useState<number>();

	const { isAuthenticated } = useAuthContext();
	const favoriteContext = useContext(FavoriteContext)

	useEffect(() => {
		console.log(isAuthenticated);
		console.log("Atualizando navbar");
	}, [isAuthenticated]);

	useEffect(() => {
		setGeneroFav(Number(localStorage.getItem("generoFavorito")));
	}, [localStorage.getItem("generoFavorito")]);

	const refresh = () => window.location.reload();

	const [search, setSearch] = useState("");

	const navigate = useNavigate();

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (!search) return;
		navigate(`/search?q=${search}`);
		setSearch("");
		refresh();
	};

	function closeSearch() {
		setResponsiveSearch(false);
		setSearchOpen(false);
	}

	function showFilter() {
		setIsShownFilter(!isShownFilter);
		setIsShownGenerosF(false);
	}

	function logout() {
		localStorage.removeItem("ACCESS_TOKEN");
		removeFavoriteState(favoriteContext)
		navigate("/login");
	}

	if (window.location.pathname == '/admin'){
		return(
			<div className="navbar" style={{ display: "flex", justifyContent:"end"}}>
				<button 
					className="navbarItem" 
					style={{marginRight: '2%'}} 
					onClick={logout}>
					Sair
				</button>
			</div>
		)
	}
	else if (!isShown) {
		return (
			<div className="logoContainer" onClick={()=>navigate('/')}>
				<img src={logo} alt="logo" title="logo" 
					className="bigLogo"
					onClick={()=>navigate('/')}/>
			</div>
		);
	}
	//IS SHOWN && NAO RESPONSIVESEARCH
	else if (!responsiveSearch) {
		return (
			<nav className="navbar">
				<div className="list space">
					<li className="list gapMenuLogo">
						<div className="menuItem">
							<li
								className="list"
								onMouseLeave={() => setIsShownGenerosM(false)}>
								<a className="menu_bars">
									<TiThMenu />
								</a>
								<a className="navbarItem hide">Menu</a>
							</li>
							<div className="dropdown_menu">
								<ul style={{marginTop:'1.5em'}}>
									<li>
										<Link 
										className="navbarItem" to="/filmes/movie-popular">
											Todos os filmes
										</Link>
									</li>

									<li>
									<li>
							<Link
								className="navbarItem"
								to={`/filmes/discover-movie/${localStorage.getItem(
								"generoFavorito"
								)}/Feito Para Você`}
								onClick={(e) => {
								if (!localStorage.getItem("ACCESS_TOKEN")) {
									e.preventDefault(); // Evita a navegação padrão
									// Redireciona o usuário para a página de login
									navigate("/login"); // Supondo que você tenha uma função navigate definida
								}
								}}
							>
								Feito para você
							</Link>
							</li>
							</li>

									<li>
										<Link
											className="navbarItem"
											to="/filmes/movie-popular/0/Cinema"
										>
											Melhor do cinema
										</Link>
									</li>

									<li>
										<Link
											className="navbarItem"
											to="/filmes/movie-now_playing/0/Cartaz"
										>
											Em cartaz
										</Link>
									</li>

									<button
										className="navbarItem generoMenu"
										onClick={() => setIsShownGenerosM(!isShownGenerosM)}
									>
										Gêneros
									</button>
									{isShownGenerosM && (
										<div className="generos generoPositionMenu">
											<ul>
												<li
													onClick={() =>
														navigate("/filmes/discover-movie/28/Ação")
													}
													className="navbarItem txtSize"
												>
													Ação
												</li>
												<li
													onClick={() =>
														navigate("/filmes/discover-movie/12/Aventura")
													}
													className="navbarItem txtSize"
												>
													Aventura
												</li>
												<li
													onClick={() =>
														navigate("/filmes/discover-movie/16/Animação")
													}
													className="navbarItem txtSize"
												>
													Animação
												</li>
												<li
													onClick={() =>
														navigate("/filmes/discover-movie/35/Comédia")
													}
													className="navbarItem txtSize"
												>
													Comédia
												</li>
												<li
													onClick={() =>
														navigate("/filmes/discover-movie/80/Crime")
													}
													className="navbarItem txtSize"
												>
													Crime
												</li>
												<li
													onClick={() =>
														navigate("/filmes/discover-movie/18/Drama")
													}
													className="navbarItem txtSize"
												>
													Drama
												</li>
											</ul>
											<ul>
												<li
													onClick={() =>
														navigate("/filmes/discover-movie/14/Fantasia")
													}
													className="navbarItem txtSize"
												>
													Fantasia
												</li>
												<li
													onClick={() =>
														navigate("/filmes/discover-movie/27/Terror")
													}
													className="navbarItem txtSize"
												>
													Terror
												</li>
												<li
													onClick={() =>
														navigate("/filmes/discover-movie/9648/Mistério")
													}
													className="navbarItem txtSize"
												>
													Mistério
												</li>
												<li
													onClick={() =>
														navigate("/filmes/discover-movie/10749/Romance")
													}
													className="navbarItem txtSize"
												>
													Romance
												</li>
												<li
													onClick={() =>
														navigate("/filmes/discover-movie/878/Sci-fi")
													}
													className="navbarItem txtSize"
												>
													Sci-fi
												</li>
												<li
													onClick={() =>
														navigate("/filmes/discover-movie/53/Suspense")
													}
													className="navbarItem txtSize"
												>
													Suspense
												</li>
											</ul>
										</div>
									)}
								</ul>
							</div>
						</div>
						<li onClick={()=>navigate('/')}>
							<img src={logo} alt="logo" title="logo" className="logo"/>
						</li>
					</li>
					<li className="list search">
						<form className="searchBar" onSubmit={handleSubmit}>
							<input
								className="searchText"
								type="text"
								placeholder="Pesquisar..."
								onChange={(e) => setSearch(e.target.value)}
								value={search}
							/>
							<a className="icon_padrao">
								<IoMdSearch />
							</a>
						</form>
					</li>

					<div className="list responsive">
						<a
							className="icon_padrao show"
							onClick={() => setResponsiveSearch(true)}
						>
							<IoMdSearch />
						</a>
						<Link
							className="list"
							to={isAuthenticated ? "/favoritos" : "/login"}
						>
							<a className="navbarItem hideFirst">Meus Favoritos</a>
							<a className="icon_padrao hideFirst">
								<HiStar />
							</a>
							<a className="favoritos showFirst">
								<BsBookmarkStar />
							</a>
						</Link>
					</div>

					{isAuthenticated ? (
						<Link className="list" to="/perfil">
							<a className="navbarItem hideLast">Meu Perfil</a>
							<a className="perfil">
								<RiAccountCircleFill />
							</a>
						</Link>
					) : (
						<button
							className="list loginButton"
							onClick={() => {
								navigate("/login");
								refresh();
							}}
						>
							<a className="navbarItem">Login</a>
							<a className="icon_padrao">
								<LuLogIn />
							</a>
						</button>
					)}
				</div>
			</nav>
		);
	} else {
		return (
			<nav className="navbar">
				<form className="searchBar" onSubmit={handleSubmit}>
					<input
						className="searchText"
						type="text"
						placeholder="Pesquisar..."
						onChange={(e) => setSearch(e.target.value)}
						value={search}
						onClick={() => setSearchOpen(true)}
					/>
					<a className="icon_padrao">
						{searchOpen ? (
							<a className="close" onClick={closeSearch}>
								<IoMdClose />
							</a>
						) : (
							<IoMdSearch />
						)}
					</a>
				</form>
			</nav>
		);
	}
}

export default Navbar;

/* <li>
							<button onClick={showFilter} className="filter_button hide">
								<MdFilterListAlt />
							</button>
							{isShownFilter && (
								<div>
									<div className="filterBox">
										<ul>
											<button
												className="navbarItem txtSize generoFilter"
												onClick={() => setIsShownGenerosF(!isShownGenerosF)}
											>
												Gêneros
											</button>
											<li className="navbarItem txtSize">Atores</li>
											<li className="navbarItem txtSize">Diretores</li>
											<li className="navbarItem txtSize">Plataformas</li>
										</ul>
									</div>
									{isShownGenerosF && (
										<div className="generos generoPositionFilter">
											<ul>
												<li className="navbarItem txtSize">Ação</li>
												<li className="navbarItem txtSize">Aventura</li>
												<li className="navbarItem txtSize">Animação</li>
												<li className="navbarItem txtSize">Comédia</li>
												<li className="navbarItem txtSize">Crime</li>
												<li className="navbarItem txtSize">Drama</li>
											</ul>
											<ul>
												<li className="navbarItem txtSize">Fantasia</li>
												<li className="navbarItem txtSize">Terror</li>
												<li className="navbarItem txtSize">Mistério</li>
												<li className="navbarItem txtSize">Romance</li>
												<li className="navbarItem txtSize">Sci-fi</li>
												<li className="navbarItem txtSize">Suspense</li>
											</ul>
										</div>
									)}
								</div>
							)}
						</li>
					</li>

					<div className="list responsive">
						<a
							className="icon_padrao show"
							onClick={() => setResponsiveSearch(true)}
						>
							<IoMdSearch />
						</a>
						<Link
							className="list"
							to={isAuthenticated ? "/favoritos" : "/login"}
						>
							<a className="navbarItem hideFirst">Meus Favoritos</a>
							<a className="icon_padrao hideFirst">
								<HiStar />
							</a>
							<a className="favoritos showFirst">
								<BsBookmarkStar />
							</a>
						</Link>
					</div>

					{isAuthenticated ? (
						<Link className="list" to="/perfil">
							<a className="navbarItem">Meu Perfil</a>
							<a className="perfil">
								<RiAccountCircleFill />
							</a>
						</Link>
					) : (
						<button
							className="list loginButton"
							onClick={() => {
								navigate("/login");
								refresh();
							}}
						>
							<a className="navbarItem">Login</a>
							<a className="icon_padrao">
								<LuLogIn />
							</a>
						</button>
					)}
				</div>
			</nav>
		);
	} else if (isShown) {
		return (
			<nav className="navbar">
				<form className="searchBar" onSubmit={handleSubmit}>
					<input
						className="searchText"
						type="text"
						placeholder="Pesquisar..."
						onChange={(e) => setSearch(e.target.value)}
						value={search}
						onClick={() => setSearchOpen(true)}
					/>
					<a className="icon_padrao">
						{searchOpen ? (
							<a className="close" onClick={closeSearch}>
								<IoMdClose />
							</a>
						) : (
							<IoMdSearch />
						)}
					</a>
				</form>
			</nav>
		);
	}
}

export default Navbar;
*/