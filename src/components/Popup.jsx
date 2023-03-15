import { forwardRef } from 'react';
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
import Selecter from './Selecter';
import { POPUP_TITLE } from '../utils/constants';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Popup({ data, labels, closePopup }) {
  const isOpen = Boolean(Object.values(data).length);
  const { id, name, price, dept, subdept, group} = data;
  const labelsArr = labels.map(({ field, headerName }, index) => Boolean(index) ? headerName : field);

  const inputsArr = price ? [name, price] : [name];
  const selecterProps = group ? {
    dept,
    subdept,
    group,
    labels: labelsArr.splice(3,3),
  } : {
    dept,
    subdept,
    labels: labelsArr.splice(2,3),
  };

  return (
    <Dialog
      open={isOpen}
      maxWidth="sm"
      fullWidth={true}
      onClose={() => closePopup()}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle>{POPUP_TITLE}</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        {isOpen && inputsArr.map(
          (item, index) =>
          <TextField
            key={index.toString()}
            id={Object.keys(data)[index + 1]}
            label={labelsArr[index + 1]}
            defaultValue={Object.values(data)[index + 1]}
            fullWidth
            variant="outlined"
            margin="dense"
            type="text"
          />
        )}
        {isOpen && <Selecter {...selecterProps} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closePopup()}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  )
};

export default Popup;
