interface MediaPostRequest {
  mediaType: string;
  mediaId: number;
}

export interface PostFavoriteType extends MediaPostRequest {
  favorite: boolean;
}

export interface PostWatchListType extends MediaPostRequest {
  watchlist: boolean;
}
