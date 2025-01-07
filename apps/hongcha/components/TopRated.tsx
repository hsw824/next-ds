import MovieList from './MovieList';

import { useState, useEffect } from 'react';
import { useTopRated } from 'queries/useTopRated';
import TopRatedResult from 'models/MovieInfoClass';

const TopRated = () => {
  const [pageNum, setPageNum] = useState(1);
  const [items, setItems] = useState<TopRatedResult[]>([]);

  const {
    isFetching,
    isLoading,
    data: { results },
    error,
  } = useTopRated(pageNum);

  useEffect(() => {
    if (!isFetching && results) {
      setItems((prev) => [...prev, ...results]);
    }
  }, [isFetching]);
  if (isLoading) return <div className="bg-red-600 text-white">리액트 쿼리 로딩중</div>;
  if (error) throw error;

  return (
    <div>
      {isFetching && <div className="bg-blue-600 text-white">리액트 쿼리 중간 로딩중</div>}
      <MovieList results={items} callApi={setPageNum} />
    </div>
  );
};

export default TopRated;
