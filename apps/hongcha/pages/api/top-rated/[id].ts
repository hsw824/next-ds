import { NextApiRequest, NextApiResponse } from 'next';
import { GenreType } from 'types/apiTypes';
import { getDetailMovie } from 'utils/useAxios';

type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

type SpokenLanguage = {
  iso_639_1: string;
  name: string;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: GenreType[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
};

export type CustomMovie = {
  adult: boolean;
  backdropPath: string;
  belongsToCollection: string;
  budget: number;
  genres: GenreType[];
  homepage: string;
  id: number;
  imdbId: string;
  originCountry: string[];
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  productionCompanies: ProductionCompany[];
  productionCountries: ProductionCountry[];
  releaseDate: string;
  revenue: number;
  runtime: number;
  spokenLanguages: SpokenLanguage[];
  status: string;
};

class MovieDetailInfo {
  adult: boolean;
  backdropPath: string;
  belongsToCollection: string;
  budget: number;
  genres: GenreType[];
  homepage: string;
  id: number;
  imdbId: string;
  originCountry: string[];
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  productionCompanies: ProductionCompany[];
  productionCountries: ProductionCountry[];
  releaseDate: string;
  revenue: number;
  runtime: number;
  spokenLanguages: SpokenLanguage[];
  status: string;

  constructor(data: Movie) {
    this.adult = data.adult;
    this.backdropPath = data.backdrop_path;
    this.belongsToCollection = data.belongs_to_collection;
    this.budget = data.budget;
    this.genres = data.genres;
    this.homepage = data.homepage;
    this.id = data.id;
    this.imdbId = data.imdb_id;
    this.originCountry = data.origin_country;
    this.originalLanguage = data.original_language;
    this.originalTitle = data.original_title;
    this.overview = data.overview;
    this.popularity = data.popularity;
    this.posterPath = data.poster_path;
    this.productionCompanies = data.production_companies;
    this.productionCountries = data.production_countries;
    this.releaseDate = data.release_date;
    this.revenue = data.revenue;
    this.runtime = data.runtime;
    this.spokenLanguages = data.spoken_languages;
    this.status = data.status;
  }
}

export default async function handleGetDetails(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    const results = await getDetailMovie(id as string);

    const movieDetailInstance = new MovieDetailInfo(results);
    res.status(200).json({ results: movieDetailInstance });
  } catch (error) {
    res.status(500).json({ message: '에러', error: error });
  }
}
