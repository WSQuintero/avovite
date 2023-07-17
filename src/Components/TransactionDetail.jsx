import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link as RouterLink, Route } from "react-router-dom";
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

import BackgroundPhoto from "../assets/img/backgroundphoto.svg";
import logo from "../assets/img/logo.svg";

import { useTheme } from "@emotion/react";
import Header from "../Components/Header/Header";
import { useFinalContext } from "../Context/FinalContext";
import ModalCheckout from "../Components/Modals/ModalCheckout";
import { bancos } from "../utilities/myCards";
function TransactionDetail() {
  const theme = useTheme();
  const { formBanck, setformBanck, setDetailTransaction } = useFinalContext();
  const route = useNavigate();
  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log(data);
  //   };
  // console.log(formBanck)
  const handleModalCheck = () => {
    setformBanck(null);
    setDetailTransaction(null);
  };
  const handleCloseForm = () => {
    setformBanck(null);
    setDetailTransaction(null);
  };
  const filterBanck = bancos.find((e) => e.id == formBanck);

  return (
    <Box
      position="absolute"
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
      sx={{
        backgroundColor: "white",
      }}
    >
      <Header />

      <Box width="100%" height={40} bgcolor="#67AA36">
        <Button
          onClick={() => handleCloseForm()}
          sx={{
            marginLeft: 1,
            color: "secondary.body",
            textTransform: "none",
          }}
          startIcon={<KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />}
        >
          {filterBanck.banco}
        </Button>
      </Box>

      {/* the filter of image */}

      <Grid display="flex" flexDirection="column">
        <Grid
          flexGrow={1}
          paddingX={4}
          paddingY={4}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography variant="h2" color="primary.main" fontWeight={549}>
            Datos de trasferencia{" "}
          </Typography>

          <Grid>
            <Typography color="primary.main">
              Fecha y hora de transacción
            </Typography>
            <Typography color="text.cards">
              Transacción {filterBanck.banco}
            </Typography>
            <Typography color="text.cards">2024/06/07 - 13:27:31 </Typography>
          </Grid>

          <Box width="100%" height={1} bgcolor="text.disabled" border={1}></Box>

          <Grid>
            <Typography color="primary.main">Origen</Typography>
            <Typography color="text.cards">
            Cuenta Avovite: 

            </Typography>
            <Typography color="text.cards">N: *********0413</Typography>
          </Grid>
          <Box width="100%" height={1} bgcolor="text.disabled" border={1}></Box>
          <Grid>
            <Typography color="primary.main">
            Valor de transacción 
            </Typography>
            <Typography color="text.cards">
            $ 1.000.000  
            </Typography>
            
          </Grid>

          <Box width="100%" height={1} bgcolor="text.disabled" border={1}></Box>

          <Grid>
            <Typography color="primary.main">
              Numero de autorización 
            </Typography>
            <Typography color="text.cards">
            008473
            </Typography>
            
          </Grid>
        </Grid>

        <Grid paddingX={4} display="flex" gap={2}>
          <Button
            variant="contained"
            onClick={handleModalCheck}
            fullWidth
            sx={{ color: "white" }}
          >
            Aceptar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TransactionDetail;
