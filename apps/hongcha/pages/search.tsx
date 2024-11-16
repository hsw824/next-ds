import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSearchList } from 'queries/useSearchList';

const SearchPage = () => {
  const router = useRouter();
  const { searchQuery } = router.query;
  const [pageNum, setPageNum] = useState(1);

  const { isError, isLoading, results, totalPages } = useSearchList(searchQuery as string, pageNum);

  const handleNextPage = () => {
    const nextPage = pageNum + 1;
    if (nextPage > totalPages) return;
    setPageNum((prev) => prev + 1);
  };

  if (isError) return <div>에러발생</div>;
  if (isLoading) return <div>로딩중</div>;

  return (
    <div className="h-full overflow-scroll">
      {results.map((result) => {
        return (
          <div>
            <img className="w-28" src={`${result.posterUrl}`} />

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
