import { FC, forwardRef } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Button,
  TextField,
} from '@mui/material';
import {
  ID_KEY,
  NAME_KEY,
  PRICE_KEY,
  INDEX_KEY,
  SORT_CAPTION,
  CAPTIONS,
  POPUP_TITLE
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

interface IPopup {
  data: TCustomData<string | number> | null;
  close: () => void;
}

const Transition = forwardRef(function Transition(props, ref) {
  //@ts-expect-error
  return <Slide direction="up" ref={ref} {...props} />;
});

const Popup: FC<IPopup> = ({ data, close }) => {
  return (
    <Dialog
      open={Boolean(data)}
      maxWidth="sm"
      fullWidth={true}
      onClose={close}
      //@ts-expect-error
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle>{POPUP_TITLE}</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Popup;
