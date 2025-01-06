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

  if (isLoading) return <div>로딩중</div>;
  if (error) throw error;

  return <MovieList results={items} callApi={setPageNum} />;
};

export default TopRated;
