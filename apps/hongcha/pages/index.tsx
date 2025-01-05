import TopRated from 'components/TopRated';
import Favorite from 'components/Favorite';
import WatchList from 'components/WatchList';
import Loading from 'components/Loading';

import { ErrorBoundary } from 'components/errorBoundary/ErrorBoundary';
import { Suspense } from 'react';

export default function () {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <TopRated />
        <Favorite />
        <WatchList />
      </Suspense>
    </ErrorBoundary>
  );
}
