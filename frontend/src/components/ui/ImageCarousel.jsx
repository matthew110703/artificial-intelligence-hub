// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import ImageContainer from "./ImageContainer";
import { v4 as uuid } from "uuid";

const ImageCarousel = ({ images }) => {
  return (
    <Swiper
      className="mx-auto max-w-md lg:max-w-full"
      modules={[Pagination, EffectFade]}
      spaceBetween={20}
      pagination={{ clickable: true }}
      slidesPerView={1}
      effect="fade"
    >
      {images.map((image) => (
        <SwiperSlide key={uuid()}>
          <ImageContainer image={image.src || image.origin} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
