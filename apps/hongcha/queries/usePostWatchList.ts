import { useMutation } from '@tanstack/react-query';
import { postWatchList } from 'apis/postWatchList';

export const usePostWatchList = () => {
  const { mutate } = useMutation({
    mutationFn: (id: number) =>
      postWatchList({
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
