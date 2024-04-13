import React from 'react';
import { Box, Typography } from '@mui/material';

const Section = ({ title, value, children }) => {
  const circleColor = 'rgba(201, 233, 173, 1)';

  return (
    
    <Box sx={{ display: 'column', alignItems: 'center', flex: 1, marginRight: '30px', color: 'black', fontSize: '14px', justifyContent: 'space-between'}}>
     <Box sx={{display: 'flex', marginBottom: '30px'}}>

      <h3 style={{ whiteSpace: 'nowrap', marginRight: 'auto' , fontSize: '14px'}}>{title}</h3>
      {value && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: circleColor,  }}>
          <span style={{ padding: '8px', fontSize: '11px', fontWeight: '300' }}>{value}</span>
        </Box>
      )}
     </Box>
      <Box style={{ width: '100%', minHeight: 0, display: 'column' }}>
        {children}
      </Box>
    </Box>
  );
};

export default Section;
