import { useState, useEffect } from 'react';

import { useSelector } from '../services/hooks';

import type { TResourceData } from '../types';

import { PAGE_COUNTER } from '../utils/constants';

interface IPagination {
  currentPage: number;
  currentPageCounter: number;
  currentPageItems: TResourceData[];
  setCurrentPage: (counter: number) => void;
  handlePageItems: (arr: TResourceData[], counter: number) => void;
}

const usePagination = (): IPagination => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageCounter, setCurrentPageCounter] = useState<number>(0);
  const [currentPageItems, setCurrentPageItems] = useState<TResourceData[]>([]);

  // const { res } = useSelector(state => state.pricelist);

  const handlePageItems = (arr: TResourceData[], counter: number): void => {
    const currentItems = arr.filter((_, index) => index >= PAGE_COUNTER * (counter - 1) && index < PAGE_COUNTER * counter);

    setCurrentPageItems(currentItems);
    setCurrentPageCounter(Math.ceil(arr.length / PAGE_COUNTER));
  }

  return {
    currentPage,
    currentPageCounter,
    currentPageItems,
    setCurrentPage,
    handlePageItems
  };
}

export default usePagination;
