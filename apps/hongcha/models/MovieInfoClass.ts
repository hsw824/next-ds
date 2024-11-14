import { TMDBMovieType } from 'types/movieTypes';

export default class MovieInfoClass {
  /** 성인용 컨텐츠 여부 */
  adult: boolean;
  /** 이미지 path */
  backdropPath: string;
  /** 장르 코드(number코드) */
  genreIds: number[];
  /** id */
  id: number;
  /** 원본 제목 */
  originalTitle: string;
  /** 영화 요약 */
  overview: string;
  /** 인기 점수 */
  popularity: number;
  /** 포스터 이미지 path */
  private posterPath: string;
  /** 개봉일 */
  private releaseDate: string;
  /** 영화 제목 */
  private _title: string;
  /** 예고편 비디오 여부 */
  video: boolean;
  /** 평균 평점 */
  voteAverage: number;
  /** 총 투표 수 */
  voteCount: number;

  constructor(data: TMDBMovieType) {
    this.adult = data.adult;
    this.backdropPath = data.backdrop_path;
    this.genreIds = data.genre_ids;
    this.id = data.id;
    this.originalTitle = data.original_title;
    this.overview = data.overview;
    this.popularity = data.popularity;
    this.posterPath = data.poster_path;
    this.releaseDate = data.release_date;
    this._title = data.title;
    this.video = data.video;
    this.voteAverage = data.vote_average;
    this.voteCount = data.vote_count;
  }

  /** 포스터 url getter */
  get posterUrl() {
    return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASIC_URL}${this.posterPath}`;
  }
  /** 개봉년도 getter */
  get releaseYear() {
    return `${new Date(this.releaseDate).getFullYear()}`;
  }
  /** 영화 제목 getter */
  get title() {
    return this._title;
  }
}
