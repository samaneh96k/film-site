import React from "react";
import FilmComment from "../../components/film/film-comment";
import FilmContent from "../../components/film/film-content";
import FilmDetails from "../../components/film/film-details";
import Head from "next/head";
import axios from "axios";

const FilmPage = ({ film }) => {
  console.log(film);
  return (
    <React.Fragment>
      <Head>
        <title>تاپ فیلم || {film.name}</title>
      </Head>
      <div className="p-5">
        <FilmContent film={film} />
        <FilmDetails />
        <FilmComment comments={film.comments} filmId={film._id}/>
      </div>
    </React.Fragment>
  );
};

export const getServerSideProps = async (context) => {
  const filmID = context.params.slug;
  const film = (await axios.get("/api/film", { params: { filmID } })).data;

  return {
    props: {
      film,
    },
  };
};

export default FilmPage;
