import MovieList from './MovieList';

import { useState } from 'react';
import { useTopRated } from 'queries/useTopRated';

const TopRated = () => {
  // TODO: 페이지네이션 관련 처리는 임시 / 추후 캐로셀에서 관리
  const [pageNum, setPageNum] = useState(1);

  const handlePrevPage = () => {
    const prevPage = pageNum - 1;
    if (prevPage <= 0) return;
    setPageNum((prev) => prev - 1);
  };

  const handleNextPage = () => {
    const nextPage = pageNum + 1;
    if (nextPage > totalPages) return;
    setPageNum((prev) => prev + 1);
  };

  const { results, totalPages, error } = useTopRated(pageNum);

  if (error) throw error;

  return (
    <>
      <MovieList results={results} />
      <button onClick={handlePrevPage}>이전 페이지</button>
      <button onClick={handleNextPage}>다음 페이지</button>
    </>
  );
};

export default TopRated;
