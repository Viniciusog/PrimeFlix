import '../Login/Login.css'
import './redefinir.css'
import {useState} from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import API from '../../../source/axios'
import LoadingModal from '../../components/LoadingModal';

const validationSchema = yup.object().shape({
    email: yup.string().email().required()
})

function RedefinirSenha () {

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const [emailError,setEmailError] = useState('');
    const [emailNotFound, setEmailNotFound] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = () => {
        setIsLoading(true)
        validationSchema
        .validate({email}, {abortEarly: false})
        .catch ((errors: yup.ValidationError) => {
            errors.inner.forEach (error => {
                if (error.path === 'email'){
                   setEmailError(error.message);
                   setIsLoading(false)
                } 
            })
        })
        if (!emailError){
            sendEmail()
        }
    }

    console.log("Email sent: " + emailSent)

    function sendEmail() {
        API.patch("/sendchangepasswordlink",{email: email})
        .then(()=>setEmailSent(true))
        .then ((response)=>console.log(response))
        .catch((error) => {
            setEmailNotFound (true);
            console.log(error)}
        ).finally(() => {
            setIsLoading(false)
         });
    }
        
    if (!emailSent) {
        return(
        <div className='loginBox'>
            <LoadingModal isOpen={isLoading}/>
            <div className='contentBox'>
                <h2 className='titleFont redefinirSenha'>Redefinir senha</h2>
                <h4 className='forgot textSize'>Digite o e-mail associado a sua conta e clique em “Continuar”</h4>
                {!emailError && emailNotFound && <h5 className='error'>E-mail não encontrado. Tente novamente</h5>}
                <form className={emailError||emailNotFound?'':'formPlacing'}>
                    <h6 className='text'>E-mail</h6>
                    <div className='textBox'>
                        <input 
                        type='email'
                        className='input'
                        onChange={e => setEmail(e.target.value)}>
                        </input>
                    </div>
                    {!!emailError && <h5 className='error'>{emailError}</h5>}
                    <button 
                        type="button"
                        onClick={handleSubmit} 
                        className='continuar button'
                        >Continuar
                    </button>
                    
                </form>
            </div>
            
        </div>)
    } else {
        return (
        <div className='loginBox'>
            <div className='contentBox'>
                <h2 className='titleFont redefinirSenha'>Redefinir senha</h2>
                <h4 className='forgot emailSent'>Entre no link enviado para o seu e-mail cadastrado para redefinir a senha.</h4>
                <button 
                    className='button fazerLogin'
                    onClick={()=>{console.log("Navegando..."); navigate('/login')}}>Fazer Login</button>
            </div>
        </div>
    )}
}


export default RedefinirSenha