import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  Typography,
  Card,
  CardActionArea,
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
import ProductDetail from "../Pages/ProductDetail";

function ProductCardDesktop() {
  const theme = useTheme();
  const { productoViteId, setProductoViteId } = useFinalContext();
  const route = useNavigate();

  const handlerHandlerDetail = (id) => {
    setProductoViteId(id);
    route(`/productDetail/${id}`);
  };

  return (
    <Grid display="flex">
      {/* the filter of image */}
      <Grid
        display="flex"
        flexDirection="row"
        alignItems="center"
        flexWrap="wrap"
       
        gap={6}
        sx={{
          width: "60vw",
          height: "80vh",
          marginTop: 10,
        }}
      >
        {paquages.map((e) => (
          <>
            <Grid
            component={Button}
              display="flex"
              flexDirection="column"
              alignItems="center"
              border={1}
              borderRadius={2}
              borderColor="primary.main"
              width={300}
              height={286}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={7}
                sx={{
                  marginLeft: 9,
                  width: 100,
                  height: 100,
                }}
              >
                <img
                  src={e.paquete === "Premium" ? plantaPremium : plantaEstandar}
                  width="100%"
                  height="100%"
                  alt="logo"
                />
                <Box
                  bgcolor={e.paquete === "Premium" ? "#D0A723" : "primary.main"}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="50%"
                  sx={{
                    paddingX: 0.8,
                    width: 900,
                    height: 40,
                  }}
                >
                  <Typography color="secondary.body">{e.discount}%</Typography>
                </Box>
              </Box>
              <Card key={e.id} elevation={0} sx={{ bgcolor: "white" }}>
                <CardActionArea sx={{ padding: 2 }}>
                  <Grid
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    gap={1}
                  >
                    <Grid
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      gap={0.1}
                    >
                      <Typography
                        onClick={() => handlerHandlerDetail(e.id)}
                        sx={{
                          color:
                            e.paquete === "Premium" ? "orange" : "primary.main",
                          fontWeight: 500,
                        }}
                      >
                        {e.cant} Vites
                      </Typography>
                      <Typography sx={{ color: "text.cards" }} fontSize={12}>
                        Paquete:{" "}
                        <span
                          style={{ color: e.paquete === "Premium" ? "orange" : "green"}}
                        >
                          {e.paquete}
                        </span>
                      </Typography>
                      <Typography sx={{ color: "text.disabled", fontSize: 14 }}>
                        Precio:{" "}
                        <span style={{ color: "black", fontWeight: 600 }}>
                          $ {e.precio}
                        </span>
                      </Typography>
                    </Grid>
                    <Button
                      width="100%"
                      variant="contained"
                      sx={{
                        backgroundColor:
                          e.paquete === "Premium" ? "#D0A723" : "primary.main",
                        color: "white",
                        textTransform: "none",
                      }}
                      startIcon={<ShoppingCartIcon color="white" />}
                    >
                      Añadir al Carrito
                    </Button>
                    <Typography
                      sx={{
                        color:
                          e.paquete === "Premium" ? "#D0A723" : "primary.main",
                        fontSize: 12,
                      }}
                    >
                      Producción del paquete
                    </Typography>
                  </Grid>
                </CardActionArea>
              </Card>
            </Grid>
          </>
        ))}
      </Grid>
    </Grid>
  );
}

export default ProductCardDesktop;
