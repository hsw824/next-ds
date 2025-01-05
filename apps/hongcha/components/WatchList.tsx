import MovieList from './MovieList';

import { useWatchList } from 'queries/useWatchListQuery';
import { useState } from 'react';

const WatchList = () => {
  const [pageNum, setPageNum] = useState(1);
  const { results, totalPages, error } = useWatchList(pageNum);

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

export default WatchList;
