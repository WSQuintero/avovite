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

function ProductDetailDesktop() {
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
    <Grid display="flex" flexDirection="column" marginTop={10}>
   
      
        <Grid
          flexGrow={1}
          paddingX={4}
          paddingY={4}
          
          flexDirection="column"
          gap={4}
          sx={(t)=>({
            display:'none',
            [t.breakpoints.up('lg')]:{
                display:"flex"
            }
          })}
          
        >
          <Grid display="flex" marginLeft={4} alignItems='center'justifyContent='center' gap={4}>
            <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            width="25vw"
            height="50vh"
            border={1}
            borderColor='primary.main'
            borderRadius={2}
            gap={4}

            >

            <img  width="50%"
            height="50%"
              src={filterBanck.paquete === "Premium" ? plantaPremium : plantaEstandar}
             
              alt="logo"
            />
            <Grid display='flex' flexDirection='column' alignItems='center'
            justifyContent='center'>

            <Typography color='primary.main' fontWeight={600}>{filterBanck.cant} Vites</Typography>
            <Typography color='text.cards' fontWeight={600}>Precio: <span style={{color:'#214820', fontWeight:600}}>
            $ {filterBanck.precio}        </span></Typography>
            </Grid>
            </Box>
            <Box component={Button} >

          <img  width="85%"
            height="85%"src={cosechaMinima} onClick={handleDetailCosechaMinima}alt='photo'/>
            </Box>
          </Grid>
         
          <img  width="50%"
            height="50%"src={cosechaMaxima} alt='photo'/>
        </Grid>

       
      
   
    {
      cosechaMinimaDetail !== null && (
        <DetailCosecha/>
      )
    }
    </Grid>
  );
}

export default ProductDetailDesktop;
