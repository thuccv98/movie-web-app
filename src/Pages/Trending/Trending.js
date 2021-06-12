import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import CustomPagination from '../../components/Pagination/CustomPagination.js';
import SingleContent from '../../components/SingleContent/SingleContent.js';
import './Trending.css';

const Trending = () => {
  const [page, setPage] = useState([1]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        );

        setContent(data.results);
      } catch (error) {
        console.log('Failed to fetch API:', error.message);
      }
    }
    fetchTrending();
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content &&
          content.map((item) => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.first_air_date || item.release_date}
              media_type={item.media_type}
              vote_average={item.vote_average}
            />
          ))}
      </div>
      <CustomPagination onPageChange={setPage} />
    </div>
  );
};

export default Trending;
