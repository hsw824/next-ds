import TopRatedResult from 'models/MovieInfoClass';
import ImageCard from 'components/ImageCard';
import { useRef, useState, useEffect } from 'react';

interface CarouselProps {
  results: TopRatedResult[];
  callApi: React.Dispatch<React.SetStateAction<number>>;
}

const MovieList = ({ results, callApi }: CarouselProps) => {
  const [index, setIndex] = useState(0);
  const $ul = useRef<HTMLUListElement>(null);
  // const [page, setPage] = useState(0);

  useEffect(() => {
    if (!$ul.current) return;
    $ul.current.style.transform = `translateX(-${100 * index}%)`;
  }, [index]);

  const handlePrevPage = () => {
    const newPage = index - 1;
    if (newPage === -1) return;
    setIndex(newPage);
  };

  const handleNextPage = () => {
    const newPage = index + 1;
    if (results.length === newPage * 4) {
      callApi((prev) => prev + 1);
    }
    setIndex(newPage);
  };
  return (
    <div className="bg-black w-full overflow-hidden relative">
      <button className="bg-white absolute top-0 h-full z-10" onClick={handlePrevPage}>
        prev
      </button>
      <ul ref={$ul} className="flex flex-nowrap transition-transform duration-300">
        {results.map(({ id, title, posterUrl }) => (
          <ImageCard id={id} key={id} title={title} posterUrl={posterUrl} />
        ))}
      </ul>

      <button className="bg-white absolute h-full top-0 right-0 z-10" onClick={handleNextPage}>
        next
      </button>
    </div>
  );
};
export default MovieList;
