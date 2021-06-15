import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Genres from '../../components/Genres/Genres';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
import useGenres from '../../hooks/useGenres';

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  const genresforURL = useGenres(selectedGenres);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=vi-VN&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresforURL}`
        );
        setContent(data.results);
        setNumOfPages(data.total_pages);
      } catch (error) {
        console.log('Failed to fetch API:', error.message);
      }
    }

    fetchMovies();
  }, [page, genresforURL]);

  return (
    <div>
      <span className="pageTitle">Movies</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((item) => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.first_air_date || item.release_date}
              media_type="movie"
              vote_average={item.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination onPageChange={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Movies;
