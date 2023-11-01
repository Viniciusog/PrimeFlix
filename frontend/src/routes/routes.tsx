import Favoritos from "../pages/Favoritos/Favoritos.tsx";
import Home from "../pages/Home/Home.tsx";
import DetalhesFilme from "../pages/DetalhesFilme/index.tsx";
import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import TodosFilmes from "../pages/TodosFilmes/TodosFilmes.tsx";
import { ProtectedLayout } from "../contexts/Auth/ProtectedLayout.tsx";
import Cadastro from "../pages/Cadastro/Cadastro.tsx";
import Login from "../pages/Login/Login.tsx";
import RedefinirSenha from "../pages/RedefinirSenha/email.tsx";
import Search from "../pages/ObjetoPesquisado/ObjetoPesquisado.tsx"
import EditarPerfil from "../pages/EditarPerfil/EditarPerfil.tsx";
import PerfilUsuario from "../pages/PerfilUsuario/PerfilUsuario.tsx";
import PainelDeControle from "../pages/PainelDeControle/PainelDeControle.tsx";
import { ProtectedLayoutAdm } from "../contexts/ProtectedLayoutAdm.tsx";


const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/favoritos",
				element: (
					<ProtectedLayout>
						<Favoritos />
					</ProtectedLayout>
				),
			},

			{
				path: "/perfil",
				element: (
					<ProtectedLayout>
						<PerfilUsuario />
					</ProtectedLayout>
				),
			},
			{
				path: "/filmes/:url/:genero?/:titulo?",
				element: <TodosFilmes />,
			},
			{
				path: "/login",
				element: <Login/>,
			},
			{
				path: "/detalhesFilme/:id/",
				element: <DetalhesFilme />,
			},
			{
				path: "/cadastro",
				element: <Cadastro />,
			},
			{
				path: "/redefinirSenha",
				element: <RedefinirSenha />,
			},
			{
				path: "/search",
				element: <Search />,
			}, 
			{
				path: "/editarPerfil",
				element: <EditarPerfil />,
			},
			{
				path: "/admin",
				element: <ProtectedLayoutAdm> <PainelDeControle /></ProtectedLayoutAdm> ,
			},
		],
	},
]);

export default router;
