import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const CustomPagination = ({ onPageChange, numOfPages = 10 }) => {
  const handlePageChange = (newPage) => {
    onPageChange(newPage);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={numOfPages}
          shape="rounded"
          variant="outlined"
          onChange={(e) => handlePageChange(e.target.textContent)}
          hideNextButton={true}
          hidePrevButton={true}
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
