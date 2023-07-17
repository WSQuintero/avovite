import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link as RouterLink, Route, useParams } from "react-router-dom";
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
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";

import BackgroundPhoto from "../assets/img/backgroundphoto.svg";
import logo from "../assets/img/logo.svg";

import { useTheme } from "@emotion/react";
import Header from "../Components/Header/Header";
import { useFinalContext } from "../Context/FinalContext";
import ModalCheckout from "../Components/Modals/ModalCheckout";
import plantaEstandar from "../assets/img/products/plantaEstandar.svg";
import plantaPremium from "../assets/img/products/plantaPremium.svg";
import cosechaMinima from '../assets/img/products/cosechaminima.svg'


import cosechaMaxima from '../assets/img/products/cosechaMaxima.svg'


import { paquages } from "../utilities/myCards";
import DetailCosecha from "../Components/DetailCosecha";

function ProductDetail() {
  const theme = useTheme();
  const {id} = useParams();
  const { productoViteId, setProductoViteId, setCosechaMinimaDetail, cosechaMinimaDetail } = useFinalContext();
  const route = useNavigate();
  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log(data);
  //   };
  // console.log(formBanck)
  const handleModalCheck = () => {
    setProductoViteId(null);
  };
  const handleCloseForm = () => {
    setProductoViteId(null);
    route('/products')
  };

  const handleDetailCosechaMinima = ()=>{
    setCosechaMinimaDetail(true);
  }

  const handleChecout = ()=>{
    route('/checkout')
  }
  const filterBanck = paquages.find((e) => e.id == id);


  return (
    <Grid display="flex" flexDirection="column">
    <Box
      position="absolute"
      
      width="100%"
      display="flex"
      flexDirection="column"
      sx={{
        backgroundColor: "white",
      }}
    >
      <Header />

      <Box width="100%"
          paddingX={1}
          height={40}
          bgcolor="primary.main"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
        <Button
          onClick={() => handleCloseForm()}
          sx={{
            marginLeft: 1,
            color: "secondary.body",
            textTransform: "none",
          }}
          startIcon={<KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />}
        >
          Produccion del pauete
        </Button>
        <Button
            onClick={handleChecout}
            variant="contained"
            sx={{ height: "80%", bgcolor: "#498A19" }}
          >
            <ShoppingCartIcon sx={{ color: "secondary.body" }} />
          </Button>
      </Box>

      {/* the filter of image */}

      
        <Grid
          flexGrow={1}
          paddingX={4}
          paddingY={4}
          display="flex"
          flexDirection="column"
          gap={4}
          
        >
          <Grid display="flex" marginLeft={4} alignItems='center' gap={4}>
            <img
              src={filterBanck.paquete === "Premium" ? plantaPremium : plantaEstandar}
              width="20%"
              height="20%"
              alt="logo"
            />
            <Grid display='flex' flexDirection='column'>

            <Typography color='text.disabled'>{filterBanck.cant} Vites</Typography>
            <Typography color='primary.main'>Precio: {filterBanck.precio}</Typography>
            </Grid>
          </Grid>
          <Box width='100%'  bgcolor='text.disabled' border={1}></Box>
          <img src={cosechaMinima} onClick={handleDetailCosechaMinima}alt='photo'/>
          <img src={cosechaMaxima} alt='photo'/>
        </Grid>

       
      
    </Box>
    {
      cosechaMinimaDetail !== null && (
        <DetailCosecha/>
      )
    }
    </Grid>
  );
}

export default ProductDetail;
