import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  InputAdornment,
  Link,
  Paper,
} from "@mui/material";
import {
  Https as HttpsIcon,
  LockOutlined as LockOutlinedIcon,
  MailOutline as MailOutlineIcon,
  Person,
  KeyboardBackspace as KeyboardBackspaceIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

import { useTheme } from "@emotion/react";
import logoCheck from "../../assets/img/logoChecktou.svg";

 function ModalCheckout({ onCloseModal }) {
  const theme = useTheme();
  const route = useNavigate()
  console.log(onCloseModal);

  const handleCoseModal = () => {
    onCloseModal();
    
    route('/menu')
  };

  return (
    <Grid display="flex" flexDirection="column">
      <Box position="absolute" height="100%" sx={{ backgroundColor: "white" }}>
        {/* the filter of image */}

        <Grid
          paddingX={5}
          paddingY={7}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box>
            <Grid
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap={4}
            >
              <img src={logoCheck} width={140} height={140} alt="logocheck" />
              <Typography
                color="primary.main"
                textAlign="center"
                sx={{ fontSize: "25px", fontWeight: 600 }}
              >
                Términos y Condiciones
              </Typography>

              <Typography
               color="text.disabled"
               textAlign="center"
               paddingX={5}
               sx={{ fontSize: "18px", fontWeight: 400 }}
              >
                Gracias por inscribirse a Avovite te confirmamos que hemos
                recibido correctamente tu inscripción
              </Typography>
              <Button
              variant="contained"
              onClick={handleCoseModal}
              fullWidth
              sx={{ color: "white" }}
            >
              Cerrar
            </Button>
            </Grid>
          </Box>

         
           
         
        </Grid>
      </Box>
    </Grid>
  );
}


export default ModalCheckout