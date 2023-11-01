import Carrossel from "../Carrossel";
import { SwiperSlide } from "swiper/react";
import Filme from "../Filme";
import { IFilme } from "../../types/IFilme";
import useFetch from "../../hooks/useFetch.hook";
import { useState, useEffect } from "react";
import API from "../../sources/axios";

interface Props {
	url: string;
	page?: string;
	TMDB: boolean;
}

const CarrosselFilmes = ({ url, page, TMDB }: Props) => {
	const [dataFilmes] = useFetch<IFilme[]>(url, "results", page ? page : "1");
	const [filmes, setFilmes] = useState<IFilme[]>();

	useEffect(() => {
		!TMDB &&
			API.get(
				`/movies/recommendations/${localStorage.getItem(
					"generoFavorito"
				)}?page=1
`
			).then((res) => setFilmes(res.data.results));
	}, [localStorage.getItem("generoFavorito")]);

	const settings = {
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			// when window width is >= 480px
			480: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
			640: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
			// when window width is >= 640px
			768: {
				slidesPerView: 5,
				spaceBetween: 20,
			},
			1500: {
				slidesPerView: 7,
				spaceBetween: 20,
			},
		},
		loop: true,
	};

	return (
		<>
			<div>
				<Carrossel settings={settings}>
					{TMDB
						? dataFilmes &&
						  dataFilmes.map((filme) => (
								<SwiperSlide key={filme.id} style={{justifyContent: "center"}}>
									<Filme {...filme} layout_coluna={true} />
								</SwiperSlide>
						  ))
						: filmes &&
						  filmes.map((filme) => (
								<SwiperSlide key={filme.id} style={{justifyContent: "center"}}>
									<Filme {...filme} layout_coluna={true} />
								</SwiperSlide>
						  ))}
				</Carrossel>
			</div>
		</>
	);
};

export default CarrosselFilmes;
