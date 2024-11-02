import { NextApiRequest, NextApiResponse } from 'next';
import { getDefaultGenre, getFavoriteMovies } from 'utils/useAxios';
import { originTopRatedResultType, ResponseDataType, GenreType } from 'types/apiTypes';

class FavoriteResult {
  adult: boolean;
  backdropPath: string;
  genreIds: string[];
  id: number;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;

  constructor(data: originTopRatedResultType, genre: GenreType[]) {
    const findGenre = genre.filter((g) => data.genre_ids.includes(g.id));
    const flattenGenre = findGenre.map((item) => item.name);

    this.adult = data.adult;
    this.backdropPath = data.backdrop_path;
    this.genreIds = flattenGenre;
    this.id = data.id;
    this.originalTitle = data.original_title;
    this.overview = data.overview;
    this.popularity = data.popularity;
    this.posterPath = data.poster_path;
    this.releaseDate = data.release_date;
    this.title = data.title;
    this.video = data.video;
    this.voteAverage = data.vote_average;
    this.voteCount = data.vote_count;
  }
}

export default async function handleGetFavorite(req: NextApiRequest, res: NextApiResponse) {
  const pageNum = (req.query.page as string) || 1;

  try {
    const { results, total_pages }: ResponseDataType = await getFavoriteMovies(pageNum);
    const genre = await getDefaultGenre();

    const favoriteInstances = results.map((result) => new FavoriteResult(result, genre));
    res.status(200).json({ results: favoriteInstances, toTalPages: total_pages });
  } catch (error) {
    res.status(500).json({ message: '에러', error });
  }
}
