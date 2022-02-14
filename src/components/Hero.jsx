import React, { useState } from "react";
import { Swiper, SwiperSlide,  } from 'swiper/react';
import SwiperCore, { Scrollbar,Pagination,Navigation, A11y } from 'swiper';
import fakeImage from '../assets/images/heroImgFAKE.jpg'
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
import "../styles/components/hero.css"
const images = [
  {
    src: fakeImage,
  },
  {
    src: fakeImage,
  },
  {
    src: fakeImage,
  },
]
const style = {
  width: "100%",
  height: "100%",
  borderRadius: "5px"
}
const Hero = () => {
  const [ heroImg , setHeroImg ] = useState(images)
  return(
    <section className="hero">
       <Swiper 
       modules={[Navigation, Pagination]}
        pagination={true} 
        navigation={true}
        className="mySwiper">
          {heroImg.map((img, index) => (
            <SwiperSlide key={`${img}-${index}`}>
              <img style={style} src={img.src} alt="imagenes producto"/>
            </SwiperSlide>
          ))}
        </Swiper>
    </section>
  )

}

export { Hero };