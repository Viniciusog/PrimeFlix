import Filme from '../../components/Filme/index'
import { IFilme } from '../../types/IFilme';
import useFetch from '../../hooks/useFetch.hook';
import  {useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import './ObjetoPesquisado.css'
import { Swiper, SwiperSlide } from 'swiper/react';

function ObjetoPesquisado(){

    // const generos = [
    //     {id: '1', genero: 'Ação'},
    //     {id: '2', genero: 'Aventura'},
    //     {id: '3', genero: 'Animação'},
    //     {id: '4', genero: 'Comédia'},
    //     {id: '5', genero: 'Crime'},
    //     {id: '6', genero: 'Drama'},
    //     {id: '7', genero: 'Fantasia'},
    //     {id: '8', genero: 'Terror'},
    //     {id: '9', genero: 'Mistério'},
    //     {id: '10', genero: 'Romance'},
    //     {id: '11', genero: 'Sci-fi'},
    //     {id: '12', genero: 'Suspense'},
    // ]
    
    const  [searchParams] = useSearchParams()
    const query = searchParams.get("q");
    const [data] = useFetch<IFilme[]>(`search/movie?query=${query}`,'results');
    
    const [noOfElement, setnoOfElement] = useState(4);
    const slice = data?.slice(0,noOfElement);
    const loadMore = () => {
        setnoOfElement(noOfElement+4)
    }
    
    if (data?.length === 0){
    return(
        <div className='container'>
        {data?.length === 0 &&
            <h2 className='title'>Filme não encontrado</h2>
        }
        </div>)
    }

    else{
        return(
            <div className='container'>
                {data?.length !== 0 &&
                <div>
                    <h2 className='title'>Pesquisar: <span className="querytext">{query}</span></h2>
                    <div className='searchResults'> 
                        {data && slice && slice.map((filme)=> (
                            <div className='movie'>
                                <Filme id={filme.id} vote_average={filme.vote_average} poster_path={filme.poster_path} release_date={filme.release_date} title={filme.title} layout_coluna={true} genres={[]} overview={''} runtime={0}/>
                            </div>
                        ))}
                        {data && data?.length>noOfElement &&
                        <button 
                            className='showMore'
                            onClick={()=> loadMore()}>
                            Exibir mais resultados
                        </button>}
                    </div>
                </div>}
            </div>
        )
    }
}
export default ObjetoPesquisado;

{/* <li className='title filtro'> &gt; Filtrar</li>
                    <div className='responsiveFilter'>
                        <button>Ator</button>
                        <button>Diretor</button>
                        <button>Gênero</button>
                    </div>
                    <div className='responsiveGenre'>
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={20}
                            pagination={{clickable:true}}
                            navigation>
                            {generos.map((item)=>(
                                <SwiperSlide key= {item.id} className='swiper'>
                                    <div className='swiper'>
                                    <a className='swiperItem'>{item.genero}</a>
                                    </div>
                                    
                                </SwiperSlide>
                            ))}
                        </Swiper>  
                    </div> */}