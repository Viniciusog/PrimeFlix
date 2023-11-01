import {Swiper, SwiperProps} from 'swiper/react';
import { Navigation} from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/navigation'
import './carrossel.css'

interface SliderProps {
    settings: SwiperProps,
    children: React.ReactNode,
}

const Carrossel = ({children, settings} : SliderProps) => {
    return(
        <Swiper navigation modules={[Navigation]} {...settings}> {children} </Swiper>
    );
}

export default Carrossel;

