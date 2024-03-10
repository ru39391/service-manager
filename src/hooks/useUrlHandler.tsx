import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type TUrlData = {
  type: string;
  id: number | null;
};

interface IUrlHandler {
  currUrlData: TUrlData;
}

const useUrlHandler = (): IUrlHandler => {
  const [currUrlData, setCurrUrlData] = useState<TUrlData>({ type: '', id: null });

  const { pathname } = useLocation();

  const handleCurrUrl = (): void => {
    const urlArr = pathname.split('/');
    const type = urlArr[1];
    const id = urlArr[urlArr.length - 1] === type
      ? null
      : Number(urlArr[urlArr.length - 1]);

    setCurrUrlData({ type, id });
  };

  useEffect(() => {
    handleCurrUrl();
  }, [
    pathname
  ]);

  return {
    currUrlData
  }
}

export default useUrlHandler;
