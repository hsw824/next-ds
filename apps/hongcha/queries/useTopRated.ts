import MovieInfoClass from 'models/MovieInfoClass';
import { useQuery } from '@tanstack/react-query';
import { getTopRatedList } from 'apis/getTopRatedList';
import { TMDBQueryResponseType } from 'types/responseTypes';

export const useTopRated = (pageNum: number) => {
  const {
    isError,
    isLoading,
    error,
    data: { results = [], totalPages = 0 } = {},
  } = useQuery<TMDBQueryResponseType, Error, { results: MovieInfoClass[]; totalPages: number }>({
    queryKey: ['topRated', pageNum],
    queryFn: () => getTopRatedList(pageNum),
    select: (data) => ({
      results: data.results.map((result) => new MovieInfoClass(result)),
      totalPages: data.totalPages,
    }),
    throwOnError: true,
  });

  return { isError, isLoading, results, totalPages, error };
};
