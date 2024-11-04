import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { CustomMovie } from 'pages/api/top-rated/[id]';

interface ResultType {
  results: CustomMovie;
}

const MovieDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const getList = async (id: string) => {
    const { data } = await axios.get(`/api/top-rated/${id}`);
    return data;
  };

  const { isError, isLoading, data } = useQuery<ResultType>({
    queryKey: ['movieDetail', id],
    queryFn: () => getList(id as string),
  });

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러발생</div>;

  if (!data) return null;

  return (
    <div className="w-full h-1/2 bg-black flex">
      <div className="shrink-0 grow-0 basis-1/2">
        <h1 className="text-white text-4xl">{data.results.originalTitle}</h1>
        <p className="text-white mt-3">{data.results.overview}</p>
        {data.results.genres.map((genre) => {
          return <span className="text-white mr-2">{genre.name}</span>;
        })}
      </div>
      <div className="shrink-0 grow-0 basis-1/2">
        <img src={`http://image.tmdb.org/t/p/w500${data.results.backdropPath}`} alt="" />
      </div>
    </div>
  );
};

export default MovieDetail;
