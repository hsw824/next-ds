import { NextApiRequest, NextApiResponse } from 'next';
import { getDefaultGenre, getTopRated } from 'utils/useAxios';

interface originTopRatedResultType {
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

export interface TopRatedResultType {
  adult: boolean;
  backdropPath: string;
  genreIds: number[];
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
}

class TopRatedResult {
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

  constructor(data: originTopRatedResultType, genre: { id: number; name: string }[]) {
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

    // return this;
  }

  get Adult() {
    return this.adult;
  }
}

export default async function topRatedHandler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const results: originTopRatedResultType[] = await getTopRated();
    const genre = await getDefaultGenre();

    const topRatedInstances = results.map((result) => new TopRatedResult(result, genre));
    res.status(200).json(topRatedInstances);
  } catch (error) {
    res.status(500).json({ message: 'ㅋㅋ 에러', error });
  }
}
