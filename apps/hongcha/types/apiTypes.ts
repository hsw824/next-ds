export interface originTopRatedResultType {
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

export interface GenreType {
  id: number;
  name: string;
}

export interface ResponseDataType {
  page: number;
  results: originTopRatedResultType[];
  total_pages: number;
  total_results: number;
}

export interface TopRatedResultType {
  adult: boolean;
  /** 상위 랭킹 결과 이미지 path */
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
