import { NextApiRequest, NextApiResponse } from 'next';
import { getDefaultGenre, getWatchList } from 'utils/useAxios';
import { originTopRatedResultType, ResponseDataType, GenreType } from 'types/apiTypes';

class TopRatedResult {
  /** 성인용 컨텐츠 여부 */
  adult: boolean;
  /** 이미지 path */
  backdropPath: string;
  /** 장르 */
  genreIds: string[];
  /** id */
  id: number;
  /** 원본 제목 */
  originalTitle: string;
  /** 영화 요약 */
  overview: string;
  /** 인기 점수 */
  popularity: number;
  /** 포스터 이미지 path */
  posterPath: string;
  /** 개봉일 */
  releaseDate: string;
  /** 영화 제목 */
  title: string;
  /** 예고편 비디오 여부 */
  video: boolean;
  /** 평균 평점 */
  voteAverage: number;
  /** 총 투표 수 */
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

export default async function getWatchListHandler(req: NextApiRequest, res: NextApiResponse) {
  const pageNum = (req.query.page as string) || 1;

  try {
    const { results, total_pages }: ResponseDataType = await getWatchList(pageNum);
    const genre = await getDefaultGenre();

    const topRatedInstances = results.map((result) => new TopRatedResult(result, genre));
    res.status(200).json({ results: topRatedInstances, totalPages: total_pages });
  } catch (error) {
    res.status(500).json({ message: '에러', error });
  }
}
