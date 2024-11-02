import ImageCard from 'components/ImageCard';
import axios from 'axios';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { TopRatedResultType } from 'types/apiTypes';

interface ResultType {
  results: TopRatedResultType[];
  totalPages: number;
}

const TopRated = () => {
  const [pageNum, setPageNum] = useState(1);

  const getList = async (pageNum: number | string) => {
    const { data } = await axios.get(`/api/topRated?page=${pageNum}`);
    return data;
  };

  const {
    isError,
    isLoading,
    data: { results = [], totalPages = 0 } = {},
  } = useQuery<ResultType>({
    queryKey: ['topRated', pageNum],
    queryFn: () => getList(pageNum),
  });

  const handleNextPage = () => {
    const nextPage = pageNum + 1;
    if (nextPage > totalPages) return;
    setPageNum((prev) => prev + 1);
  };

  if (isError) return <div>에러발생</div>;
  if (isLoading) return <div>로딩중</div>;
  return (
    <>
      <ul className="flex flex-nowrap  bg-black w-full h-1/2 p-3 overflow-hidden">
        {results.map(({ id, title, posterPath }) => {
          return <ImageCard id={id} key={id} title={title} posterPath={posterPath} />;
        })}
      </ul>
      <button onClick={handleNextPage}>다음 페이지</button>
    </>
  );
};

export default TopRated;
