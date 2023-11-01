import Navbar from "./components/Navbar/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/Footer/";
import { AuthProvider } from "./contexts/Auth/AuthContext";
import './forms/TraducoesYup';
import { useEffect, useState } from "react";
import { FavoriteProvider } from "./contexts/FavoriteContext";

function App() {
	const location = useLocation()
	const [isShown, setIsShown] = useState(false);
	
	useEffect (() => {
		console.log("APP - useEffect")
		console.log("Location: " + location.pathname)
		if (window.location.pathname == '/login' || 
			window.location.pathname == '/cadastro'||
			window.location.pathname == '/redefinirSenha'||
			window.location.pathname == '/admin'){
			console.log("Não mostrar o header")
			setIsShown(false);
		}
		else {
			console.log("Mostrar header")
			setIsShown (true);
		}
	}, [location])
	
	return (
		<>
			<AuthProvider>
				<FavoriteProvider>
					<Navbar isShown = {isShown}/>
					<Outlet />
					<Footer />
				</FavoriteProvider>
			</AuthProvider>
		</>
	);
}

export default App;
