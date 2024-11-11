import MovieList from './MovieList';

import { useState } from 'react';
import { useWatchList } from 'queries/useWatchList';

const WatchList = () => {
  const [pageNum, setPageNum] = useState(1);
  const { isError, isLoading, results, totalPages } = useWatchList(pageNum);

  const handleNextPage = () => {
    const nextPage = pageNum + 1;
    if (nextPage > totalPages) return;
    setPageNum((prev) => prev + 1);
  };

  if (isError) return <div>에러발생</div>;
  if (isLoading) return <div>로딩중</div>;
  return (
    <>
      <MovieList results={results} />
      <button onClick={handleNextPage}>다음 페이지</button>
    </>
  );
};

export default WatchList;
