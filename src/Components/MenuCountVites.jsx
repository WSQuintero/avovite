import { Box, Grid, Typography } from "@mui/material";
import viteplant from "../assets/img/viteplant.svg";

import React from "react";

function MenuCountVites() {
  return (
    <Grid paddingX={2}   gap={1} display="flex" alignItems="center">
      <Box
        bgcolor="#344B2C"
        borderRadius={2}
        height={383}
        width={258}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h2" bottom={10} color="primary.main">
          Vites
        </Typography>

        <Typography variant="h2" >
        Cantidad
        </Typography>

        <img src={viteplant} width="28%" height="28%" alt="photo" />

        <Typography variant="h2"  >
          Vites
        </Typography>

        <Typography variant="h2" >
          67
        </Typography>
      </Box>
      <Box
        bgcolor="primary.main"
        borderRadius={2}
        height={383}
        width={258}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Typography bottom={10} color="white">
          Datos
        </Typography>

       <Box
       bgcolor='white'
       borderRadius={2}
       height={102}
       width={149}
       display="flex"
       flexDirection="column"
       justifyContent="center"
       alignItems="center"
       >
        <Typography  bottom={10} color="primary.main">
          Maduros
        </Typography>
        <Typography  bottom={10} color="primary.main">
          50
        </Typography>        
       </Box>
       <Box
       bgcolor='white'
       borderRadius={2}
       height={102}
       width={149}
       display="flex"
       flexDirection="column"
       justifyContent="center"
       alignItems="center"
       >
        <Typography  bottom={10} color="primary.main" textAlign='center'>
         En<br/>crecimiento
        </Typography>
        <Typography  bottom={10} color="primary.main">
          17
        </Typography>        
       </Box>
      </Box>
    </Grid>
  );
}

export default MenuCountVites;
