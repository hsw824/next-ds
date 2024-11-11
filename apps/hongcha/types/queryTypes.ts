import { originTopRatedResultType } from 'types/apiTypes';

// TopRatedQueryType originTopRatedResultType 이름 변경
export interface TopRatedQueryType {
  results: originTopRatedResultType[];
  totalPages: number;
}
