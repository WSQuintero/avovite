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
  Card,
  CardActionArea,
  Divider,
} from "@mui/material";
import {
  Https as HttpsIcon,
  LockOutlined as LockOutlinedIcon,
  MailOutline as MailOutlineIcon,
  Person,
  KeyboardBackspace as KeyboardBackspaceIcon,
  MoreVert as MoreVertIcon,
  ShoppingCart as ShoppingCartIcon,
  WhatsApp as WhatsAppIcon,
} from "@mui/icons-material";

import { useTheme } from "@emotion/react";
import Header from "../Components/Header/Header";
import logoInformacion from "../assets/img/informacion/logoInformacion.svg";
import { useFinalContext } from "../Context/FinalContext";
import cosechas from "../assets/img/cosechas/cosecha.svg";
import Tudinero from "../assets/img/cosechas/TuDinero.svg";

function CosechaDetail() {
  const theme = useTheme();
  const { vites } = useFinalContext();
  const route = useNavigate();

  return (
    <Grid display="flex" flexDirection="column" position="relative">
      <Box
        position="relative"
        height="10vh"
        display="flex"
        flexDirection="column"
      >
        <Header />

        <Box
          width="100%"
          paddingX={1}
          height={40}
          bgcolor="primary.main"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
          onClick={()=>route('/cosechas')}
            sx={{
              marginLeft: 1,
              color: "secondary.body",
              textTransform: "none",
            }}
            startIcon={
              <KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />
            }
          >
            Detalles
          </Button>
          <Button
          onClick={()=>route('/checkout')}

            variant="contained"
            sx={{ height: "100%", bgcolor: "#498A19" }}
          >
            <ShoppingCartIcon sx={{ color: "secondary.body" }} />
          </Button>
        </Box>

        {/* the filter of image */}

        <Grid
          paddingX={2}
          paddingY={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          
        >
          <Box
            bgcolor="primary.main"
            borderRadius="50%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: 60,
              height: 60,
            }}
          >
            <img src={logoInformacion} alt="logo" />
          </Box>
          <Typography
            color="text.secondary"
            sx={{ fontSize: 30, fontWeight: 600 }}
          >
            80 kg
          </Typography>
          <Typography
            color="text.disabled"
            sx={{ fontSize: 20, fontWeight: 600 }}
          >
            Fecha de la ultima cosecha
          </Typography>
          <Typography
            color="primary.main"
            sx={{ fontSize: 12, fontWeight: 600 }}
          >
            23 Nombiembre 2023
          </Typography>

          <Grid paddingY={10} marginRight={5}>
        <Typography  sx={{color:'text.secondary', fontSize:23}}>
            Cosechas Generales
          </Typography> 
          <Typography sx={{color:'text.disabled', fontSize:23}}>
            300 kg
          </Typography> 
          <Typography sx={{color:'text.secondary', fontSize:23}}>
           Cantidad de Produccion
          </Typography> 
          <Typography sx={{color:'text.disabled', fontSize:23}}>
            80 Ton
          </Typography>
          <Typography sx={{color:'text.secondary', fontSize:23}}>
           Fecha de Recolección
          </Typography> 
          <Typography sx={{color:'text.disabled', fontSize:23}}>
            23 de Noviembre del 2023
          </Typography>
          <Typography sx={{color:'text.secondary', fontSize:23}}>
           Fecha de la ultima cosecha
          </Typography> 
          <Typography sx={{color:'text.disabled', fontSize:23, fontWeight:600}}>
          23 de Noviembre del 2023
          </Typography>
        </Grid>
        </Grid>
      </Box>
      <Box
        position="absolute"
        marginTop="198%"
        marginLeft="85%"
        bgcolor="secondary.body"
        border={1}
        borderRadius="50%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width={50}
        height={50}
        sx={{
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <WhatsAppIcon sx={{ color: "primary.main", width: 35, height: 35 }} />
      </Box>
    </Grid>
  );
}

export default CosechaDetail;
