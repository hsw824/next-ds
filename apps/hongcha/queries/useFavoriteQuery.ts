import MovieInfoClass from 'models/MovieInfoClass';

import { useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { getFavoriteList, postFavoriteList } from 'apis/favorite';
import { TMDBQueryResponseType } from 'types/responseTypes';

export const useFavorite = (pageNum: number) => {
  const {
    isError,
    isLoading,
    error,
    data: { results = [], totalPages = 0 } = {},
  } = useSuspenseQuery<TMDBQueryResponseType, Error, { results: MovieInfoClass[]; totalPages: number }>({
    queryKey: ['favorites', pageNum],
    queryFn: () => getFavoriteList(pageNum),
    select: (data) => ({
      results: data.results.map((result) => new MovieInfoClass(result)),
      totalPages: data.totalPages,
    }),
  });

  return { isError, isLoading, results, totalPages, error };
};

export const usePostFavorite = () => {
  const { mutate } = useMutation({
    mutationFn: (id: number) =>
      postFavoriteList({
        mediaType: 'movie',
        mediaId: id,
        favorite: true,
      }),
    onSuccess: () => {
      console.log('성공');
    },
  });

  return { mutate };
};
