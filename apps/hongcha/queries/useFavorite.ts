import { useQuery } from '@tanstack/react-query';
import { getFavoriteList } from 'apis/getFavoriteList';
import MovieInfoClass from 'models/MovieInfoClass';
import { TopRatedQueryType } from 'types/queryTypes';

export const useFavorite = (pageNum: number) => {
  const {
    isError,
    isLoading,
    data: { results = [], totalPages = 0 } = {},
  } = useQuery<TopRatedQueryType, Error, { results: MovieInfoClass[]; totalPages: number }>({
    queryKey: ['favorites', pageNum],
    queryFn: () => getFavoriteList(pageNum),
    select: (data) => ({
      results: data.results.map((result) => new MovieInfoClass(result)),
      totalPages: data.totalPages,
    }),
  });

  return { isError, isLoading, results, totalPages };
};
