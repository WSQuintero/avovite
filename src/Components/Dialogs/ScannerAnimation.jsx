import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const ScannerAnimation = ({ loading }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      bgcolor="rgba(255, 255, 255, 0.5)" // Fondo semi-transparente para superponer sobre la imagen
      zIndex={9999} // Asegura que la animación esté en la parte superior
      pointerEvents="none" // Evita que la animación interfiera con los eventos del usuario
    >
      {loading && <CircularProgress color="primary" size={100} thickness={4} />} {/* Renderiza el CircularProgress solo cuando loading es true */}
    </Box>
  );
}

export default ScannerAnimation;
