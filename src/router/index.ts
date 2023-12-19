import { createBrowserRouter } from 'react-router-dom';

export const ROUTER_PATH = {
  ROOT: import.meta.env.BASE_URL,
};

export const router = createBrowserRouter([
  {
    path: import.meta.env.BASE_URL,
    children: [
      {
        path: ROUTER_PATH.ROOT,
        lazy: async () => {
          const PageRoot = await import('@/pages');
          return { Component: PageRoot.default };
        },
      },
    ],
  },
]);
