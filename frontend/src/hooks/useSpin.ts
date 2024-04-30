import { fetchSpinResult } from '@/services';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';

export function useSpin() {
  // clean spin data when unmount
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.removeQueries('spin', { exact: true });
  }, [queryClient]);

  // get spin data from server
  return useQuery('spin', fetchSpinResult, {
    enabled: false,
    keepPreviousData: false,
  });
}
