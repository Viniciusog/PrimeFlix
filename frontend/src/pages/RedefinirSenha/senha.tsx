import '../Login/Login.css'
import './redefinir.css'
import {useEffect, useState} from 'react';
import * as yup from 'yup';
import API from '../../../source/axios'
import { useLocation, useParams } from 'react-router-dom';

const validationSchema = yup.object().shape({
    password: yup.string().required().min(8),
    confirmPassword: yup.string().required().min(8)
        //oneOf([yup.ref('password')],'As senhas devem ser iguais')
})

function NovaSenha () {

    const search = useLocation().search;
    const oobCode = new URLSearchParams(search).get('oobCode');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordChanged, setPasswordChanged] = useState (false);
    
    const [errorDifferentPasswords, setErrorDifferentPasswords] = useState(false);
    const [confirmPasswordError,setConfirmPasswordError] = useState('');
    const [passwordError,setPasswordError] = useState('');

    const handleSubmit = () => {
        validationSchema
        .validate({password, confirmPassword}, {abortEarly: false})
        .catch ((errors: yup.ValidationError) => {
            errors.inner.forEach (error => {
                if (error.path === 'password'){
                   setPasswordError(error.message);
                }
                if (error.path === 'confirmPassword'){
                    setConfirmPasswordError (error.message);
                }
            })
        })
        if (password != confirmPassword){
            setErrorDifferentPasswords(true);
        }
        if (!passwordError&& !confirmPasswordError && !errorDifferentPasswords) {
            redefinirSenha();
        }
    }

    function redefinirSenha() {
        API.patch("/confirmpasswordchange",{newpw: password, oobCode:oobCode})
        .then(()=>setPasswordChanged(true))
        .then((response) => console.log(response))
        .catch((error) => {
            console.log(error)}
        );
    }
    
    if (!passwordChanged){
        return(
            <div className='loginBox'>
                <div className='newPassword'>
                    <h2 className='titleFont redefinirSenha'>Redefinir senha</h2>
                    <h4 className='forgot'>Informe qual será a nova senha</h4>
                </div>
                <div className='newPasswordBox'>
                {errorDifferentPasswords && !passwordError && !confirmPasswordError && <h5 className='error'>As senhas devem ser iguais</h5>}
                    <form>
                        <h6 className='text'>Nova Senha</h6>
                        <div className='textBox'>
                            <input 
                            type='password'
                            className='input'
                            onChange={e => setPassword(e.target.value)}
                            //onKeyDown={()=> setPasswordError('')}
                            >
                            </input>
                        </div>
                        {!!passwordError && <h5 className='error'>{passwordError}</h5>}
                        <h6 className='text'>Confirmar Nova Senha</h6>
                        <div className='textBox'>
                            <input 
                            type='password'
                            className='input'
                            onChange={e => setConfirmPassword(e.target.value)}
                            //onKeyDown={()=> setConfirmPasswordError('')}
                            >
                            </input>
                        </div>
                        {!!passwordError && <h5 className='error'>{confirmPasswordError}</h5>}
                        <button 
                            type='submit' 
                            onClick={(event)=>
                                {event.preventDefault();
                                handleSubmit();
                            } }
                            className='redefinir button'
                            >Redefinir
                        </button>
                        
                    </form>
                </div>
            </div>)}
    
    else {
        return(
        <div className='loginBox'>
            <div className='senhaRedefinida'>
                <h2 className='titleFont redefinirSenha'>Senha redefinida </h2>
                <h2 className='titleFont redefinirSenha'>com sucesso! </h2>
            </div>
        </div>
        )
    }
}


export default NovaSenha