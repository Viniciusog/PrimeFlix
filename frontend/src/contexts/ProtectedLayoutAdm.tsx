import { useNavigate } from 'react-router';
import '../pages/Cadastro/Cadastro.css'

interface ILoginProps {
    children: React.ReactNode;
  }

export const ProtectedLayoutAdm: React.FC<ILoginProps> = ({ children }) => {
    const Authorized = localStorage.getItem('USER_ROLE');
    const navigate = useNavigate();

    if (Authorized == 'ADMIN') return (
        <>{children}</>
      );
      return (
        <div id="containerCadastro" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <h2 className="sucess">Acesso não autorizado</h2>
          <button className='button' style={{marginBottom:'1.5em'}} onClick={()=>navigate('/')}>Home</button>
        </div>
      )
}