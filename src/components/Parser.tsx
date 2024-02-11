import React, { FC, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

import useFileUploader from '../hooks/useFileUploader';

const InvisibleInput = styled('input')({
  overflow: 'hidden',
  position: 'absolute',
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  opacity: 0
});

const Parser: FC = () => {
  const {
    depts,
    subdepts,
    groups,
    items,
    uploadFile
  } = useFileUploader();

  useEffect(() => {
    console.log(items.filter(({ isComplex }) => isComplex === 1)[0]);
  }, [items]);

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Button component="label" variant="contained" startIcon={<CloudUpload />}>
          Загрузить файл
          <InvisibleInput type="file" accept=".xlsx, .xls" onChange={uploadFile} />
        </Button>
      </Box>
      
      <table>
        <tr>
          <td>ID</td>
          <td>Название</td>
          <td>Цена</td>
          <td>Отделение</td>
          <td>Специализация</td>
          <td>Группа</td>
          <td>Включает услуги</td>
          <td>Отображать на сайте</td>
        </tr>
      </table>
    </>
  );
}

export default Parser;