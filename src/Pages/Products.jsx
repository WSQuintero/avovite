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
} from "@mui/icons-material";


import { useTheme } from "@emotion/react";
import Header from "../Components/Header/Header";
import logoInformacion from "../assets/img/informacion/logoInformacion.svg";
import { useFinalContext } from "../Context/FinalContext";
import { paquages } from "../utilities/myCards";
import plantaEstandar from "../assets/img/products/plantaEstandar.svg";
import plantaPremium from "../assets/img/products/plantaPremium.svg";
import ProductDetail from "./ProductDetail";
import ProductCardDesktop from "../Components/ProductCardDesktop";

function Products() {
  const theme = useTheme();
  const { productoViteId, 
    setProductoViteId}= useFinalContext()
  const route = useNavigate();

  const handlerHandlerDetail = (id)=>{
    setProductoViteId(id)
    route(`/productDetail/${id}`)
  }

  return (
    <Grid display="flex" flexDirection="column">
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
            onClick={() => route("/menu")}
            sx={{
              marginLeft: 1,
              color: "secondary.body",
              textTransform: "none",
            }}
            startIcon={
              <KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />
            }
          >
            Paquetes
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
          
          sx={(t)=>({
            display:'flex',
            paddingX:6,
            paddingY:2,
            flexDirection:"column",
            alignItems:"center",
            [t.breakpoints.up('lg')]:{
              display:'none'
            }
          })}
         
        >
          {paquages.map((e) => (
            <>
              <Grid
                display="flex"
                position='relative'
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    width: 60,
                    height: 60,
                  }}
                >
                  <Box
                    bgcolor={e.paquete === "Premium" ? "#D0A723" : "primary.main"}
                    display="flex"
                    position='absolute'
                    justifyContent="center"
                    marginRight={10}
                    marginBottom={5}
                    alignItems="center"
                    borderRadius="50%"
                    sx={{
                      width: 40,
                      height: 40,
                    }}
                  >
                    <Typography>{e.discount}%</Typography>
                  </Box>

                  <img
                    src={e.paquete === "Premium" ? plantaPremium : plantaEstandar}
                    width="100%"
                    height="100%"
                    alt="logo"
                  />
                </Box>
                <Card key={e.id} elevation={0}>
                  <CardActionArea sx={{ padding: 2 }}>
                    <Grid display="flex" flexDirection="column" justifyContent='center' alignItems='flex-start' >
                      <Typography
                        onClick={()=>handlerHandlerDetail(e.id)}
                        sx={{
                          color: e.paquete === 'Premium' ? 'orange' : 'primary.main',
                          fontSize: 25,
                          fontWeight: 500,
                        }}
                      >
                        {e.cant} Vites
                      </Typography>
                      <Typography sx={{ color: "text.cards" }} fontSize={12}>
                        Paquete {e.paquete}
                      </Typography>
                      <Typography
                        sx={{ color: "text.disabled", fontSize: 14 }}
                      >
                        Precio: <span style={{ color: "black" }}>{e.precio}</span>
                      </Typography>
                      <Button width='100%' sx={{
                        backgroundColor: e.paquete === 'Premium' ? '#D0A723' : 'primary.main', color: 'white'
                      }}

                        startIcon={<ShoppingCartIcon color="white" />}>Añadir al Carrito</Button>
                      <Typography sx={{ color: e.paquete === 'Premium' ? '#D0A723' : 'primary.main', fontSize: 12 }}>Producción del paquete</Typography>
                    </Grid>
                  </CardActionArea>
                </Card>
              </Grid>

              <Box
                width="100%"
                height={1}
                bgcolor="text.disabled"
                border={1}
              ></Box>
            </>
          ))}
        </Grid>
          <ProductCardDesktop/>
      </Box>
      
    </Grid>
  );
}

export default Products;
