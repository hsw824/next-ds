import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { MouseEvent } from 'react';

interface DescriptionCardType {
  title: string;
  id: number;
}

const postFavorite = async (id: number) => {
  const body = {
    mediaType: 'movie',
    mediaId: id,
    favorite: true,
  };
  await axios.post('/api/postFavorite', body);
};

const postWatchList = async (id: number) => {
  const body = {
    mediaType: 'movie',
    mediaId: id,
    watchlist: true,
  };

  await axios.post('api/postWatchList', body);
};

const DescriptionCard = ({ title, id }: DescriptionCardType) => {
  const { mutate } = useMutation({
    mutationFn: (id: number) => postFavorite(id),
    onSuccess: () => {
      console.log('성공');
    },
  });

  const { mutate: watchListMutate } = useMutation({
    mutationFn: (id: number) => postWatchList(id),
    onSuccess: () => {
      console.log('watchlist 성공');
    },
  });

  const handleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate(id);
  };

  const handleWatchList = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    watchListMutate(id);
  };
  return (
    <div className="w-full h-full text-white absolute top-1/2">
      <p>{title}</p>
      <button className="border-solid border-2 border-indigo-600 p-3" onClick={handleFavorite}>
        즐겨찾기
      </button>
      <button className="border-solid border-2 border-indigo-600 p-3" onClick={handleWatchList}>
        나중에 보기
      </button>
    </div>
  );
};

export default DescriptionCard;
