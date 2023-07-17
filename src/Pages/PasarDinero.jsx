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
import Header from "../Components/Header/Header";
import icon from '../assets/img/pasarDinero/icon.svg'
import photoDefault from "../assets/img/photoDefault.svg";
import { useFinalContext } from "../Context/FinalContext";
import FormCountBank from "../Components/FormCountBank";
import { bancos } from "../utilities/myCards";
import TransactionDetail from "../Components/TransactionDetail";

function PasarDinero() {
  const theme = useTheme();
  const route = useNavigate()
  const {
    formBanck, 
    setformBanck,
    DetailTransaction
   
  } = useFinalContext();

  // console.log(bancos)

  const handleFormCount = (id)=>{
    setformBanck(id)

  }
console.log(formBanck)

  return (
    <Grid display="flex" flexDirection="column">
      <Box
        position="relative"
        height="10vh"
        display="flex"
        flexDirection="column"
      >
        <Header />

        <Box width="100%" height={40} bgcolor="#67AA36">
          <Button
            onClick={()=>route('/wallet')}
            sx={{
              marginLeft: 1,
              color: "secondary.body",
              textTransform: "none",
            }}
            startIcon={
              <KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />
            }
          >
            Editar Perfil
          </Button>
        </Box>

        {/* the filter of image */}

        <Grid
          
          paddingY={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <img src={photoDefault} width="50%" height="50%" alt="photo" />

          <Typography bottom={10} color="primary.main">
            Nombre
          </Typography>
          <Typography bottom={10} color="primary.main">
          $ 5.000.000
          </Typography>
          
            <Grid
              paddingY={3}
              display="flex"
              width="90%"
              flexDirection="column"
              gap={2}
            >
              {
                bancos.map(e=>(
                  <Button
                variant="contained"
                fullWidth
                onClick={()=>handleFormCount(e.id)}
                sx={{
                  color: "white",
                  justifyContent: "flex-start",
                  textTransform: "none",
                  height:50
                }}
                startIcon={<img src={icon} width="50%" height="50%" />}
              >
                {e.banco}
              </Button>
                ))
              }
              {/* <Button
                variant="contained"
                fullWidth
                onClick={() => route("/vites")}
                sx={{
                  color: "white",
                  justifyContent: "flex-start",
                  textTransform: "none",
                  height:50
                }}
                startIcon={<img src={icon} width="50%" height="50%" />}
              >
                Bancolombia
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={handleFormCount}
                sx={{
                  color: "white",
                  justifyContent: "flex-start",
                  textTransform: "none",
                  height:50
                }}
                startIcon={<img src={icon} width="50%" height="50%" />}
              >
                Davivienda
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  color: "white",
                  justifyContent: "flex-start",
                  textTransform: "none",
                  height:50
                }}
                startIcon={<img src={icon} width="50%" height="50%" />}
              >
                BBVA
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  color: "white",
                  justifyContent: "flex-start",
                  textTransform: "none",
                  height:50
                }}
                startIcon={<img src={icon} width="50%" height="50%" />}
              >
                Bancamia
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  color: "white",
                  justifyContent: "flex-start",
                  textTransform: "none",
                  height:50
                }}
                startIcon={<img src={icon} width="50%" height="50%" />}
              >
                Bancolombia
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={() => route("/profile")}
                sx={{
                  color: "white",
                  justifyContent: "flex-start",
                  textTransform: "none",
                  height:50
                }}
                startIcon={<img src={icon} width="50%" height="50%" />}
              >
                Perfil
              </Button> */}
            </Grid>

           
      
        </Grid>
      </Box>
      {
        formBanck!==null && (
          <FormCountBank />
        )
      }

      {
        DetailTransaction!==null && (
          <TransactionDetail/>
        )
      }
    </Grid>
  );
}

export default PasarDinero;
