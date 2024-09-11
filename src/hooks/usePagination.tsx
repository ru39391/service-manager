import { useState, useEffect } from 'react';

import { useSelector } from '../services/hooks';

import type { TResourceData } from '../types';

import { PAGE_COUNTER } from '../utils/constants';

interface IPagination {
  currentPage: number;
  currentPageCounter: number;
  currentPageItems: TResourceData[];
  setCurrentPage: (counter: number) => void;
}

const usePagination = (): IPagination => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageCounter, setCurrentPageCounter] = useState<number>(0);
  const [currentPageItems, setCurrentPageItems] = useState<TResourceData[]>([]);

  const { res } = useSelector(state => state.pricelist);

  const handlePageItems = (counter: number): void => {
    const currentItems = res.filter((_, index) => index >= PAGE_COUNTER * (counter - 1) && index < PAGE_COUNTER * counter);

    setCurrentPageItems(currentItems);
  }

  useEffect(() => {
    handlePageItems(currentPage);
    setCurrentPageCounter(Math.ceil(res.length / PAGE_COUNTER));
  }, [
    res,
    currentPage
  ]);

  return {
    currentPage,
    currentPageCounter,
    currentPageItems,
    setCurrentPage
  };
}

export default usePagination;
