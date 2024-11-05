import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { TopRatedResultType } from 'types/apiTypes';

interface ResultType {
  results: TopRatedResultType[];
  totalPages: number;
}
const SearchPage = () => {
  const router = useRouter();
  const { searchQuery } = router.query;
  const [pageNum, setPageNum] = useState(1);

  const getList = async (searchQuery: string, pageNum: number | string) => {
    const { data } = await axios.get(`/api/getSearchMovie?query=${searchQuery}&page=${pageNum}`);
    return data;
  };

  const handleNextPage = () => {
    const nextPage = pageNum + 1;
    if (nextPage > totalPages) return;
    setPageNum((prev) => prev + 1);
  };

  const {
    isError,
    isLoading,
    data: { results = [], totalPages = 0 } = {},
  } = useQuery<ResultType>({
    queryKey: ['search-movie', searchQuery, pageNum],
    queryFn: () => getList(searchQuery as string, pageNum),
    enabled: !!searchQuery,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  if (isError) return <div>에러발생</div>;
  if (isLoading) return <div>로딩중</div>;

  return (
    <div className="h-full overflow-scroll">
      {results.map((result) => {
        return (
          <div>
            <img className="w-28" src={`http://image.tmdb.org/t/p/w500/${result.posterPath}`} />

            <span>{result.title}</span>
          </div>
        );
      })}
      {/* TODO:무한 스크롤로 변경 */}
      <button onClick={handleNextPage}>다음 페이지</button>
    </div>
  );
};

export default SearchPage;
