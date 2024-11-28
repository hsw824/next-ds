import MovieInfoClass from 'models/MovieInfoClass';

import { useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { getBFFWatchList, postBFFWatchList } from 'apis/watchList';
import { TMDBQueryResponseType } from 'types/responseTypes';

export const useWatchList = (pageNum: number) => {
  const {
    isError,
    isLoading,
    error,
    data: { results = [], totalPages = 0 } = {},
  } = useSuspenseQuery<TMDBQueryResponseType, Error, { results: MovieInfoClass[]; totalPages: number }>({
    queryKey: ['watch-list', pageNum],
    queryFn: () => getBFFWatchList(pageNum),
    select: (data) => ({
      results: data.results.map((result) => new MovieInfoClass(result)),
      totalPages: data.totalPages,
    }),
  });
  return { isError, isLoading, results, totalPages, error };
};

export const usePostWatchList = () => {
  const { mutate } = useMutation({
    mutationFn: (id: number) =>
      postBFFWatchList({
        mediaType: 'movie',
        mediaId: id,
        watchlist: true,
      }),
    onSuccess: () => {
      console.log('watchlist 성공');
    },
  });

  return { mutate };
};
