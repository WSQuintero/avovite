import { Button } from '@mui/material';

const CustomTab = ({ label, selected, onClick }) => {
  return (
    <Button 
      variant={selected ? 'contained' : 'text'}
      color="primary" 
      onClick={onClick}
      sx={{ 
        marginRight: 1,
        fontSize: '14px',
        width: 'fit-content',
        color: 'black', 
        fontWeight:'300',
        backgroundColor: selected ? 'rgba(201, 233, 173, 1)' : 'transparent',
        border: 'none',
        boxShadow: selected ? '0px .8px 0px grey' : 'none',
        '&:hover': {
          backgroundColor: selected ? 'rgba(201, 233, 173, 1)' : 'transparent',
          color: selected ? 'white' : 'black',
        },
        '&:hover span': {
          color: 'white',
        },
      }}
    >
      {label}
    </Button>
  );
};

export default CustomTab;
