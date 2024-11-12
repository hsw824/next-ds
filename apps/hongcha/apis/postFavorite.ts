import axios from 'axios';

interface PostFavoriteMovieType {
  mediaType: string;
  mediaId: number;
  favorite: boolean;
}

export const postFavorite = async (body: PostFavoriteMovieType) => {
  await axios.post('/api/postFavorite', body);
};
