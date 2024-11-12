import axios from 'axios';

interface PostWatchListType {
  mediaType: string;
  mediaId: number;
  watchlist: boolean;
}

export const postWatchList = async (body: PostWatchListType) => {
  await axios.post('api/postWatchList', body);
};
