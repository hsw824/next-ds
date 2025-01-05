import MovieList from './MovieList';

import { useState } from 'react';
import { useFavorite } from 'queries/useFavoriteQuery';

const TopRated = () => {
  const [pageNum, setPageNum] = useState(1);
  const { error, results, totalPages } = useFavorite(pageNum);
  if (error) throw error;

  const handleNextPage = () => {
    const nextPage = pageNum + 1;
    if (nextPage > totalPages) return;
    setPageNum((prev) => prev + 1);
  };

  return (
    <>
      <MovieList results={results} />
      <button onClick={handleNextPage}>다음 페이지</button>
    </>
  );
};

export default TopRated;
