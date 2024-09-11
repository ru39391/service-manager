import { useState } from 'react';

import type { TResourceData } from '../types';

import { NO_ITEMS_TITLE, PAGE_COUNTER } from '../utils/constants';

interface IPagination {
  currentPage: number;
  currentPageCounter: number;
  currentPageItems: TResourceData[];
  currentItemsMess: string;
  setCurrentPage: (counter: number) => void;
  handlePageItems: (arr: TResourceData[], counter: number) => void;
}

const usePagination = (): IPagination => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageCounter, setCurrentPageCounter] = useState<number>(0);
  const [currentPageItems, setCurrentPageItems] = useState<TResourceData[]>([]);
  const [currentItemsMess, setCurrentItemsMess] = useState<string>('');

  const handlePageItems = (arr: TResourceData[], counter: number): void => {
    const currentItems = arr.filter((_, index) => index >= PAGE_COUNTER * (counter - 1) && index < PAGE_COUNTER * counter);

    setCurrentPageItems(currentItems);
    setCurrentItemsMess(arr.length === 0 ? NO_ITEMS_TITLE : `Найдено ресурсов: ${arr.length.toString()}`);
    setCurrentPageCounter(Math.ceil(arr.length / PAGE_COUNTER));
  }

  return {
    currentPage,
    currentPageCounter,
    currentPageItems,
    currentItemsMess,
    setCurrentPage,
    handlePageItems
  };
}

export default usePagination;