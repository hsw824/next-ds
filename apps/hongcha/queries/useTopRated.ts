import MovieInfoClass from 'models/MovieInfoClass';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getTopRatedList } from 'apis/getTopRatedList';
import { TMDBQueryResponseType } from 'types/responseTypes';

export const useTopRated = (pageNum: number) => {
  const {
    isError,
    isLoading,
    error,
    data: { results = [], totalPages = 0 } = {},
  } = useSuspenseQuery<TMDBQueryResponseType, Error, { results: MovieInfoClass[]; totalPages: number }>({
    queryKey: ['topRated', pageNum],
    queryFn: () => getTopRatedList(pageNum),
    select: (data) => ({
      results: data.results.map((result) => new MovieInfoClass(result)),
      totalPages: data.totalPages,
    }),
  });

  return { isError, isLoading, results, totalPages, error };
};
