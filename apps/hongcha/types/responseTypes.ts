import { FormattedMovieType, TMDBMovieType } from './movieTypes';

export interface TMDBResponseType {
  page: number;
  results: TMDBMovieType[];
  total_pages: number;
  total_results: number;
}

export interface FormattedResponseType {
  results: FormattedMovieType[];
  totalPages: number;
}

export interface TMDBQueryResponseType {
  results: TMDBMovieType[];
  totalPages: number;
}
