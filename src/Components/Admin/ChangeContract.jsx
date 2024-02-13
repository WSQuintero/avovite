import  { useState } from 'react';
import { Button, Modal, makeStyles } from '@material-ui/core';

// Estilos personalizados para el modal
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ChangeContract = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Open Modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <div className={classes.paper}>
          <h2 id="simple-modal-title">Modal Title</h2>
          <p id="simple-modal-description">
            This is a simple modal. You can put any content here.
          </p>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ChangeContract;
