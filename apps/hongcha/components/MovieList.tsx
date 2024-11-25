import TopRatedResult from 'models/MovieInfoClass';
import ImageCard from 'components/ImageCard';

const MovieList = ({ results }: { results: TopRatedResult[] }) => (
  <ul className="flex flex-nowrap  bg-black w-full h-1/2 p-3 overflow-hidden">
    {results.map(({ id, title, posterUrl }) => (
      <ImageCard id={id} key={id} title={title} posterUrl={posterUrl} />
    ))}
  </ul>
);
export default MovieList;
