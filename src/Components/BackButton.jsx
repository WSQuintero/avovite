import Button from '@mui/material/Button';

const BackButton = () => {

  const handleClick = () => {
    window.history.back()
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick} sx={{position:"relative",top:-20}}>
      Volver
    </Button>
  );
};

export default BackButton;
