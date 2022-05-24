import React from "react";
import { Card, Divider } from "antd";
import { Button } from "react-bootstrap";
import styles from "./film-content.module.css";
import classnames from "classnames";
import Link from "next/link";

const FilmContent = ({ film }) => {
  const { name, content, imdb_score, time, score, poster , date } = film;
  return (
    <div>
      <Card
        cover={
          <React.Fragment>
            <img
              height={200}
              // src={`/assets/slider/slide1.jpg`}
              // src={`data:${poster.media.data.contentType};base64,${new Buffer.from(poster.media.data.data).toString("base64")}`}
              // alt={poster.alt}
              style={{ filter: "blur(1.5px)" ,
              backgroundColor:"grey"
              //  backgroundImage:`url(data:${poster.media.data.contentType};base64,${new Buffer.from(poster.media.data.data).toString("base64")})` 
              }}
            />
            <div className={classnames(styles.text_img_slider, "text-right")}>
              <h2 className={styles.white_text}>{name}</h2>
              <div className="mb-2 rtl">
                <span>
                  <img src={"/imdb.svg"} width={32} />
                  {imdb_score}
                </span>
                <Divider style={{ backgroundColor: "white" }} type="vertical" />
                <span>
                  <img src={"/clock.svg"} width={20} /> {time} دقیقه
                </span>
                <Divider style={{ backgroundColor: "white" }} type="vertical" />
                <span>
                  <img src={"/calendar.svg"} width={20} /> {date}
                </span>
              </div>
              <Link href={"/films/player/[id]"} as={"/films/player/film1"}>
                <Button variant="success">تماشای فیلم</Button>
              </Link>
            </div>
          </React.Fragment>
        }
      >
        <Card.Meta
          title={<h2 className="text-center">{}</h2>}
          description={
            <p className="text-right">
              {content}
            </p>
          }
        />
      </Card>
    </div>
  );
};

export default FilmContent;
