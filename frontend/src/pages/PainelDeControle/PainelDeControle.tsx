import useFetchLocal from "../../hooks/useFetchLocal";
import { Fragment, useState } from "react";
import API from "../../sources/axios";
import './index.css'

import { IoTrashSharp } from "react-icons/io5";
import LoadingModal from "../../components/LoadingModal";
import { toDate } from "date-fns-tz";

interface FavoriteMovieGenre {
	id: number;
	name: string;
}

interface UserData {
	uid: string;
    name: string;
    email: string;
    role: string;
    favoriteMoviesIds: [];
    gender: string;
    birthday: string;
    favoriteMovie: string;
    lastLogin: string;
    favoriteMovieGenre: FavoriteMovieGenre;
}

const PainelDeControle = () => {
    
    const [data, isLoading] = useFetchLocal<UserData[]>('/users');

    const [isLoadingToo, setIsLoadingToo] = useState<boolean>(false);
    
    async function handleDeleteClick(currentEmail: string) {
        setIsLoadingToo(true)
        // Verifique a permissão do usuário
        await API.get('/profile', {
            headers: {
                'Authorization': localStorage.getItem('ACCESS_TOKEN')
            }
        })
        .then((response) => {
            const userRole = response.data.role;
            
            // Verifique se o usuário tem permissão de administrador
            if (userRole === 'ADMIN') {
                // Agora você pode excluir o usuário
                API.delete('/users', {
                    headers: {
                        'Authorization': localStorage.getItem('ACCESS_TOKEN')
                    },
                    data: {
                        'email': currentEmail
                    }
                })
                .then(() => window.location.reload())
                .catch(err => {
                    console.log(err);
                });
            } else {
                // Se o usuário não for um administrador, exiba uma mensagem de erro ou tome outra ação apropriada.
                console.log("Você não tem permissão para excluir usuários.");
            }
        })
        .catch(err => {
            console.log(err);
        }).finally(() => {
            setIsLoadingToo(false)
        });
    }

    function formatData(data: string) {
        if (!data || data.trim() == "") {
            return data
        }
        const saoPauloTimeZone = "America/Sao_Paulo";

        const dataAtualSaoPaulo = toDate(new Date(data), {
			timeZone: saoPauloTimeZone,
		});

        return (dataAtualSaoPaulo.getDate() < 10 ? '0' + dataAtualSaoPaulo.getDate() : dataAtualSaoPaulo.getDate())  + "/" + (dataAtualSaoPaulo.getMonth() < 10 ? '0' + dataAtualSaoPaulo.getMonth() : dataAtualSaoPaulo.getMonth()) + "/" + dataAtualSaoPaulo.getFullYear()
    }

    return (
        <div >
            <LoadingModal isOpen={isLoading || isLoadingToo}/>
            <h1>Painel de Controle</h1>
            <div className="container">
            <table>
            <thead>
                <tr>
                <th>Nome Completo</th>
                <th>E-mail</th>
                <th>Gênero</th>
                <th>Data de nascimento</th>
                <th>Filme Favorito</th>
                <th>Visto por ultimo</th>
                <th>Gênero de filme favorito</th>
                </tr>
            </thead>
            <tbody>
            {data && data.map((User) => (
            <Fragment key={User.uid}>
                <tr>
                    <td>{User.name || '-'}</td>
                    <td>{User.email || '-'}</td>
                    <td>{User.gender || '-'}</td>
                    <td>{formatData(User.birthday) || '-'}</td>
                    <td>{User.favoriteMovie || '-'}</td>
                    <td>{formatData(User.lastLogin) || '-'}</td>
                    <td>{User.favoriteMovieGenre ? User.favoriteMovieGenre.name : '-'}</td>
                    <td>
                        <button className='deleteButton' type="button" onClick={() => {
                            handleDeleteClick(User.email)
                        }}>
                        <IoTrashSharp/>
                        </button>
                    </td>
                </tr>
            </Fragment>
            ))}
            </tbody>
            </table>
            </div>
        </div>

  );
}


export default PainelDeControle