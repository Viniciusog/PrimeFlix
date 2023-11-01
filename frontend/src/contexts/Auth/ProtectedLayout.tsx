
import Login from '../../pages/Login/Login';


interface ILoginProps {
    children: React.ReactNode;
  }

export const ProtectedLayout: React.FC<ILoginProps> = ({ children }) => {
    const isAuthenticated = localStorage.getItem('ACCESS_TOKEN');

    if (isAuthenticated) return (
        <>{children}</>
      );
    
      return (
        <Login/>
      )
}