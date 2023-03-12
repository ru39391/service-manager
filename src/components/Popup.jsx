import { useState, forwardRef } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Button,
  TextField,
  Autocomplete,
} from '@mui/material';
import { DEPT_TYPE_NAME, SUBDEPT_TYPE_NAME, GROUP_TYPE_NAME } from '../utils/config';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Popup({ data, labels, depts, closePopup }) {
  const isOpen = Boolean(Object.values(data).length);
  const labelsArr = labels.map(({ field, headerName }, index) => Boolean(index) ? headerName : field);

  return (
    <Dialog
      open={isOpen}
      maxWidth="sm"
      fullWidth={true}
      onClose={() => closePopup()}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle>{`${data.id} - ${data.name}`}</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        {Boolean(Object.values(data).length) && labelsArr.map((item, index) =>
          <TextField
            sx={{ display: index ? "inline-flex" : "none" }}
            key={index.toString()}
            id={Object.keys(data)[index]}
            label={labelsArr[index]}
            defaultValue={Object.values(data)[index]}
            fullWidth
            variant="outlined"
            margin="dense"
            type="text"
          />
        )}
        {/*
            const paramNamesArr = [ DEPT_TYPE_NAME, SUBDEPT_TYPE_NAME, GROUP_TYPE_NAME ];
            paramNamesArr.includes(Object.keys(data)[index])
            ? <Autocomplete
            disablePortal
            key={index.toString()}
            id={Object.keys(data)[index]}
            defaultValue={depts.find(({ id }) => id === Object.values(data)[index])}
            options={depts.map(({ id, name }) => ({ id, label: name }))}
            renderInput={(params) => <TextField {...params} label={labelsArr[index]} />}
        */}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closePopup()}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  )
};

export default Popup;
