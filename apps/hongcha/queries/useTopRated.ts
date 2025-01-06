import MovieInfoClass from 'models/MovieInfoClass';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getTopRatedList } from 'apis/getTopRatedList';
import { TMDBQueryResponseType } from 'types/responseTypes';

export const useTopRated = (pageNum: number) => {
  const query = useQuery<TMDBQueryResponseType, Error, { results: MovieInfoClass[]; totalPages: number }>({
    queryKey: ['topRated', pageNum],
    queryFn: () => getTopRatedList(pageNum),
    select: (data) => ({
      results: data.results.map((result) => new MovieInfoClass(result)),
      totalPages: data.totalPages,
    }),
    placeholderData: keepPreviousData,
  });
  return {
    ...query,
    data: {
      results: query.data?.results ?? [],
      totalPages: query.data?.totalPages ?? 0,
    },
  };
};
