import Image from 'components/ImageCard';
import axios from 'axios';

import { useQuery } from '@tanstack/react-query';
import { TopRatedResultType } from 'pages/api/topRated';

//TODO:  api 관련 type은 아예 파일을 만들어서 그 안에서 관리
// interface TopRatedResultType {
//   adult: boolean;
//   backdrop_path: string;
//   genre_ids: number[];
//   id: number;
//   original_language: string;
//   original_title: string;
//   overview: string;
//   popularity: number;
//   poster_path: string;
//   release_date: string;
//   title: string;
//   video: boolean;
//   vote_average: number;
//   vote_count: number;
// }

const TopRated = () => {
  const getList = async () => {
    const { data } = await axios.get('http://localhost:3000/api/topRated');
    return data;
  };

  const {
    isError,
    isPending,
    data = [],
  } = useQuery<TopRatedResultType[]>({
    queryKey: ['topRated'],
    queryFn: getList,
  });

  if (isError) return <div>에러발생</div>;

  if (isPending) return <div>로딩중</div>;

  return (
    <ul className="flex flex-nowrap  bg-black w-full h-1/2 p-3 overflow-hidden">
      {data.map(({ id, title, posterPath }) => {
        return <Image key={id} title={title} posterPath={posterPath} />;
      })}
    </ul>
  );
};

export default TopRated;
