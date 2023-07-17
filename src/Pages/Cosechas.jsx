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
import logoInformacion from '../assets/img/informacion/logoInformacion.svg'
import { useFinalContext } from "../Context/FinalContext";
import cosechas from '../assets/img/cosechas/cosecha.svg';
import Tudinero from '../assets/img/cosechas/TuDinero.svg'

function Cosechas() {
  const theme = useTheme();
  const {vites} = useFinalContext()
  const route = useNavigate()

  return (
    <Grid display="flex" flexDirection="column" position='relative'>
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
            sx={{
              marginLeft: 1,
              color: "secondary.body",
              textTransform: "none",
            }}
            startIcon={<KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />}
          >
           Cosechas
          </Button>
          <Button variant="contained" sx={{ height: "100%", bgcolor:'#498A19' }}>
            <ShoppingCartIcon sx={{ color: "secondary.body" }} />
          </Button>
        </Box>


        {/* the filter of image */}

        <Grid
          paddingX={2}
          paddingY={2}
          display="flex"
          flexDirection="column"
          justifyContent='center'
          alignItems="center"
          gap={3}
        >
        <img src={cosechas} onClick={()=>route('/cosechaDetail')} width='90%' height='90%' alt='cosecha'/>
        <Box width='100%' height={1} bgcolor='text.disabled' border={1}></Box>
        <img src={Tudinero} onClick={()=>route('/dineroDetail')}  width='105%' height='105%' alt="photo"/>
        </Grid>
      </Box>
      {/* <Box
            position='absolute'
            marginTop='198%'
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
            <WhatsAppIcon
              sx={{ color: "primary.main", width: 35, height: 35 }}
            />
          </Box> */}
      
    </Grid>
  );
}

export default Cosechas;

