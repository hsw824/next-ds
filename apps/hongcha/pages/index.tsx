import TopRated from 'components/TopRated';
import Favorite from 'components/Favorite';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function () {
  return (
    <QueryClientProvider client={queryClient}>
      <TopRated />
      <Favorite />
    </QueryClientProvider>
  );
}
