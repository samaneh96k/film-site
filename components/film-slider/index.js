import React from "react";
import { Card } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import styles from "./film-slider.module.css";

const FilmSlider = ({ dark, data }) => {
  return (
    <div className={dark ? "bg-dark" : undefined}>
      <Swiper
        freeMode={true}
        slidesPerView={8}
        spaceBetween={20}
        dir="rtl"
        // pagination={{clickable:true}}
        className="p-3"
        breakpoints={{
          "@0.00": {
            "slidesPerView": 2,
            "spaceBetween": 20
          },
          "@0.75": {
            "slidesPerView": 3,
            "spaceBetween": 20
          },
          "@1.00": {
            "slidesPerView": 5,
            "spaceBetween": 20
          },
          "@1.50": {
            "slidesPerView": 8,
            "spaceBetween": 30
          }
        }}
      >
        {data.map((film) => (
          <SwiperSlide key={film._id}>
            <div className="text-center">
              <Link href={"/films/[slug]"} as={`/films/${film._id}`}>
                <div className={styles.card_font_hover}>
                  <Card className={styles.card} bg={dark ? "dark" : undefined}>
                    <Card.Img
                      className={
                        dark ? styles.img_shadow_dark : styles.img_shadow
                      }
                      src={`data:${film.poster.media.data.contentType};base64,${new Buffer.from(film.poster.media.data.data).toString("base64")}`}
                      alt="image 1"
                    />
                    <p className={dark ? styles.text_white : undefined}>
                      {film.name}
                    </p>
                  </Card>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FilmSlider;
