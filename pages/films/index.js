import React, { useState } from "react";
import FilmCard from "../../components/films/film-card";
import { Row, Col } from "react-bootstrap";
import { Radio, Divider, Pagination } from "antd";
import axios from "axios";
import categories from "../../util/categories.json";

const FilmsListPage = ({ films }) => {
  const [data, setData] = useState(films);

  const handleClickRadioBtn = async (text) => {
    axios
      .get("/api/films/cats", {
        params: { type: "cats", text },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(err));
  };

  return (
    <div>
      <div className="w-100 p-3 text-center rtl">
        <Radio.Group defaultValue="scifi" buttonStyle="solid">
          {categories.cats.map((cat, index) => (
            <Radio.Button
              onClick={() => handleClickRadioBtn(cat.value)}
              key={index}
              value={cat.value}
            >
              {cat.text}
            </Radio.Button>
          ))}
        </Radio.Group>
        <p className="mt-3">
          شما می توانید بر اساس ژانر مورد نظر خود فیلم ها را دسته بندی کنید.
        </p>
      </div>
      <Divider />
      <Row className="w-100 p-3 text-center rtl">
        {data.map((film, index) => (
          <Col key={index} xl={2} lg={2} md={3} sm={4} xs={6}>
            <FilmCard key={index} film={film} />
          </Col>
        ))}
      </Row>
      <div className="text-center">
        <Pagination size="small" total={50} pageSize={5} />
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const getFilms = (
    await axios.get("/api/films/cats", {
      params: { type: "cats", text: "scifi" },
    })
  ).data;

  return {
    props: {
      films: getFilms,
    },
  };
};

export default FilmsListPage;
