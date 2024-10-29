import { useEffect, useState } from 'react';
import { getTopRated } from '../utils/useAxios';
import Image from 'components/Image';
interface TopRatedResultType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function () {
  const [data, setData] = useState<TopRatedResultType[]>([]);
  const handleTopRated = async () => {
    const { data } = await getTopRated();
    setData(data.results);
  };
  useEffect(() => {
    handleTopRated();
  }, []);

  return (
    <ul className="flex flex-nowrap  bg-black w-full h-1/2 p-3 overflow-hidden">
      {data.map(({ id, title, poster_path }) => {
        return <Image key={id} title={title} posterPath={poster_path} />;
      })}
    </ul>
  );
}
