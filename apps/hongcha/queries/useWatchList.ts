import { useQuery } from '@tanstack/react-query';
import { getWatchList } from 'apis/getWatchList';
import MovieInfoClass from 'models/MovieInfoClass';
import { TopRatedQueryType } from 'types/queryTypes';

export const useWatchList = (pageNum: number) => {
  const {
    isError,
    isLoading,
    data: { results = [], totalPages = 0 } = {},
  } = useQuery<TopRatedQueryType, Error, { results: MovieInfoClass[]; totalPages: number }>({
    queryKey: ['watch-list', pageNum],
    queryFn: () => getWatchList(pageNum),
    select: (data) => ({
      results: data.results.map((result) => new MovieInfoClass(result)),
      totalPages: data.totalPages,
    }),
  });
  return { isError, isLoading, results, totalPages };
};
