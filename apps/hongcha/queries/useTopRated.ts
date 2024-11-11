import { useQuery } from '@tanstack/react-query';
import { getTopRatedList } from 'apis/getTopRatedList';
import { TopRatedQueryType } from 'types/queryTypes';
import MovieInfoClass from 'models/MovieInfoClass';

export const useTopRated = (pageNum: number) => {
  const {
    isError,
    isLoading,
    data: { results = [], totalPages = 0 } = {},
  } = useQuery<TopRatedQueryType, Error, { results: MovieInfoClass[]; totalPages: number }>({
    queryKey: ['topRated', pageNum],
    queryFn: () => getTopRatedList(pageNum),
    select: (data) => ({
      results: data.results.map((result) => new MovieInfoClass(result)),
      totalPages: data.totalPages,
    }),
  });

  return { isError, isLoading, results, totalPages };
};
