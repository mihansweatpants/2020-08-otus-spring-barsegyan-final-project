import { useState } from 'react';

export const usePagination = (defaultLimit: number = 10) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(defaultLimit);
  const [totalItems, setTotalItems] = useState(0);

  return {
    page,
    setPage,

    limit,
    setLimit,

    totalItems,
    setTotalItems,
  }
};
