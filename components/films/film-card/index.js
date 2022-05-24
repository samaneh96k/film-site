import React from "react";
import styles from "./film-card.module.css";
import { Card } from "react-bootstrap";
import Link from "next/link";

const FilmCard = ({film}) => {
  return (
    <div className="text-center">
      <Link href={"/films/[slug]"} as={"/films/film1"}>
        <div className={styles.card_font_hover}>
          <Card className={styles.card}>
            <Card.Img
              className={styles.img_shadow}
              src={`data:${film.poster[0].media.contentType};base64,${(film.poster[0].media.data)}`}
              alt={film.poster[0].alt}
            />
            <p>{film.name}</p>
          </Card>
        </div>
      </Link>
    </div>
  );
};

export default FilmCard;
