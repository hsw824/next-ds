import { usePostFavorite } from 'queries/usePostFavorite';
import { usePostWatchList } from 'queries/usePostWatchList';
import { MouseEvent } from 'react';

interface DescriptionCardType {
  title: string;
  id: number;
}

const DescriptionCard = ({ title, id }: DescriptionCardType) => {
  const { mutate: favoriteMutate } = usePostFavorite();
  const { mutate: watchListMutate } = usePostWatchList();

  const handleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    favoriteMutate(id);
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
