import { useQuery } from '@tanstack/react-query';
import { getSearchList } from 'apis/searchList';
import MovieInfoClass from 'models/MovieInfoClass';
import { TMDBQueryResponseType } from 'types/responseTypes';

export const useSearchList = (searchQuery: string, pageNum: number) => {
  const {
    isError,
    isLoading,
    data: { results = [], totalPages = 0 } = {},
  } = useQuery<TMDBQueryResponseType, Error, { results: MovieInfoClass[]; totalPages: number }>({
    queryKey: ['search-movie', searchQuery, pageNum],
    queryFn: () => getSearchList(searchQuery, pageNum),
    select: (data) => ({
      results: data.results.map((result) => new MovieInfoClass(result)),
      totalPages: data.totalPages,
    }),
    enabled: !!searchQuery,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return { isError, isLoading, results, totalPages };
};
