import { FC } from 'react';
import { TextField } from '@mui/material';
import {
  ID_KEY,
  NAME_KEY,
  PRICE_KEY,
  INDEX_KEY,
  SORT_CAPTION,
  CAPTIONS
} from '../utils/constants';

/*
item_id - нельзя редактировать

name - поле
price - поле
index - поле

dept - список
subdept - список
group - список

isComplexItem - радио (если отмечено, показывать список доступных комплексов и поле ввода количества)
isComplex - радио (если отмечено, показывать услуги в комплексе complex)
isVisible - радио
*/

import type { TCustomData } from '../types';

interface IDataForm {
  data: TCustomData<string | number> | null;
}

const DataForm: FC<IDataForm> = ({ data }) => {
  return (
    <><p>123</p>
        {data !== null && [INDEX_KEY, NAME_KEY, PRICE_KEY].map(
          (key, index) =>
          <TextField
            key={index.toString()}
            id={data[ID_KEY].toString()}
            //@ts-expect-error
            label={key === INDEX_KEY ? SORT_CAPTION : CAPTIONS[key]}
            defaultValue={data[key].toString()}
            fullWidth
            variant="outlined"
            margin="dense"
            type="text"
          />
        )}
        {/*isOpen && <Selecter {...selecterProps} />*/}
    </>
  )
}

export default DataForm;
