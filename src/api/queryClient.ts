import { QueryClient, DefaultOptions } from '@tanstack/react-query';

const defaultQueryOptions: DefaultOptions = {
  queries: {
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,
  },
  mutations: {
    retry: 0,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: defaultQueryOptions,
});


// react query
//zustand
