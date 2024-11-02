import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

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

const DescriptionCard = ({ title, id }: DescriptionCardType) => {
  const { mutate } = useMutation({
    mutationFn: (id: number) => postFavorite(id),
    onSuccess: () => {
      console.log('성공');
    },
  });
  return (
    <div className="w-full h-full text-white absolute top-1/2">
      <p>{title}</p>
      <button className="border-solid border-2 border-indigo-600 p-3" onClick={() => mutate(id)}>
        즐겨찾기 추가하기
      </button>
    </div>
  );
};

export default DescriptionCard;
