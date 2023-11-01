import { useAuthContext } from "../../contexts/Auth/AuthContext";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthContext()
  return (
      <footer className="containerFooter">
            <div className="infoFooter">
                <span>Contato: <a href="mailto:contato@primeflix.com">contato@primeflix.com</a></span>
                <a className="underline" onClick={isAuthenticated? ()=>navigate('/perfil'): ()=>navigate('/login')}>
                  {isAuthenticated ? "Minha conta" : "Login"}
					      </a>                      
            </div>
            <div className="marca">
                <span>- 2023 | primeflix.com -</span>
            </div>
    </footer>
  );
};

export default Footer;
