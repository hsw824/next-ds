import TopRated from 'components/TopRated';
import Favorite from 'components/Favorite';
import WatchList from 'components/WatchList';
import { ErrorBoundary } from 'components/errorBoundary/ErrorBoundary';

export default function () {
  return (
    <ErrorBoundary>
      <TopRated />
      <Favorite />
      <WatchList />
    </ErrorBoundary>
  );
}
