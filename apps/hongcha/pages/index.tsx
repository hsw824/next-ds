import TopRated from 'components/TopRated';
import Favorite from 'components/Favorite';
import WatchList from 'components/WatchList';
import { ApiErrorBoundary } from 'components/errorBoundary/ApiErrorBoundary';

export default function () {
  return (
    <>
      <ApiErrorBoundary>
        <TopRated />
        <Favorite />
        <WatchList />
      </ApiErrorBoundary>
    </>
  );
}
