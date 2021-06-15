const useGenres = (selectedGenres) => {
  if (selectedGenres.length < 1) return '';

  const GenresIDs = selectedGenres.map((g) => g.id);
  return GenresIDs.reduce((acc, curr) => acc + ',' + curr);
};

export default useGenres;
