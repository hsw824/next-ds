import { useMutation } from '@tanstack/react-query';
import { postFavorite } from 'apis/postFavorite';

export const usePostFavorite = () => {
  const { mutate } = useMutation({
    mutationFn: (id: number) =>
      postFavorite({
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
