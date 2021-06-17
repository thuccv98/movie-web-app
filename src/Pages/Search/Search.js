import {
  Button,
  createMuiTheme,
  Tabs,
  Tab,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [content, setContent] = useState();
  const [numOfPage, setNumOfPage] = useState();

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#fff',
      },
    },
  });

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=vi-VN&query=${searchText}&page=${page}&include_adult=false`
      );

      setContent(data.results);
      setNumOfPage(data.total_pages);
    } catch (error) {
      console.log('Failed to fetch API', error.message);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div
          style={{
            display: 'flex',
            marginTop: '30px',
            marginBottom: '10px',
          }}
        >
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="outlined"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginLeft: 10 }}
            onClick={fetchSearch}
          >
            <SearchIcon />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
        >
          <Tab style={{ width: '50%' }} label="Search Movies" />
          <Tab style={{ width: '50%' }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map((item) => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.first_air_date || item.release_date}
              media_type={type ? 'tv' : 'movie'}
              vote_average={item.vote_average}
            />
          ))}
        {/* {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)} */}
      </div>
      {numOfPage > 1 && (
        <CustomPagination onPageChange={setPage} numofPages={numOfPage} />
      )}
    </div>
  );
};

export default Search;
