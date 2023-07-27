import React, { useState, useEffect, useRef } from "react";
import {
  useNavigate,
  Link as RouterLink,
  Route,
  useParams,
} from "react-router-dom";
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

import BackgroundPhoto from "../assets/img/backgroundphoto.svg";
import logo from "../assets/img/logo.svg";

import { useTheme } from "@emotion/react";
import Header from "../Components/Header/Header";
import { useFinalContext } from "../Context/FinalContext";
import ModalCheckout from "../Components/Modals/ModalCheckout";
import plantaEstandar from "../assets/img/products/plantaEstandar.svg";
import plantaPremium from "../assets/img/products/plantaPremium.svg";
import cosechaMinima from "../assets/img/products/cosechaminima.svg";

import cosechaMaxima from "../assets/img/products/cosechaMaxima.svg";

import { paquages } from "../utilities/myCards";
import DetailCosecha from "../Components/DetailCosecha";
import GroupedButtons from "../Components/GroupedButtons";
import PayComponent from "../Components/PayComponent";

function Checkout() {
  const theme = useTheme();
  //   const {id} = useParams();
  const {
    productoViteId,
    setProductoViteId,
    setCosechaMinimaDetail,
    cosechaMinimaDetail,
    setPagarComponent,
    PagarComponent,
  } = useFinalContext();
  const route = useNavigate();

  const handleModalCheck = () => {
    setProductoViteId(null);
  };
  const handleCloseForm = () => {
    setProductoViteId(null);
    route("/products");
  };

  const handleDetailCosechaMinima = () => {
    setCosechaMinimaDetail(true);
  };

  const handleChecout = () => {
    route("/checkout");
  };

  const handlePagar = () => {
    setPagarComponent(true);
  };

  return (
    <Grid
      display="flex"
      flexDirection="column"
      sx={(t) => ({
        [t.breakpoints.up("lg")]: {
          marginTop: 10,
        },
      })}
    >
      <Box
        position="absolute"
        width="100%"
        display="flex"
        flexDirection="column"
        sx={(t) => ({
          backgroundColor: "white",
          [t.breakpoints.up("lg")]: {
            display: "none",
          },
        })}
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
            onClick={() => handleCloseForm()}
            sx={{
              marginLeft: 1,
              color: "secondary.body",
              textTransform: "none",
            }}
            startIcon={
              <KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />
            }
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
      </Box>
      <Grid
        flexGrow={1}
        paddingX={4}
        paddingY={4}
        display="flex"
        flexDirection="column"
        gap={4}
      >
        <Typography
          variant="h2"
          sx={(t) => ({
            display: "none",
            [t.breakpoints.up("lg")]: {
              display: "flex",
            },
          })}
        >
          Carrito
        </Typography>
        <Grid display="flex" marginLeft={4} alignItems="center" gap={4}>
          <img src={plantaEstandar} width="20%" height="20%" alt="logo" />
          <Grid display="flex" flexDirection="column" gap={2}>
            <Typography color="text.cards">1 Vites</Typography>

            <Grid display="flex" gap={1}>
              <Typography color="text.cards">Cantidad:</Typography>
              <GroupedButtons />
            </Grid>

            <Typography color="primary.main">Precio: $ 4.500.000</Typography>
          </Grid>
        </Grid>
        <Box
          width="100%"
          height={3}
          bgcolor="text.disabled"
          border={1}
          sx={(t) => ({
            display: "flex",
            [t.breakpoints.up("lg")]: {
              display: "none",
            },
          })}
        ></Box>

        <Box
          position="relative"
          sx={{
            width: "100%",
            height: "40px",
            bgcolor: "#F5F7F9",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={(t) => ({
              gap: 6,

              [t.breakpoints.up("lg")]: {
                gap: 1,
                width: "100vw",
              },
            })}
          >
            <TextField
              name="codigoCupon"
              placeholder="Código de cupón"
              sx={{
                borderRadius: "10px",
                border: "none",
                width: "62vw",
              }}
              InputProps={{
                style: {
                  color: "black",
                  height: "40px",
                  fontSize: "20px",
                  fontWeight: 500,
                  borderRadius: "10px",
                  borderColor: "transparent",
                },
              }}
            />

            <Typography
              marginRight={1}
              component={Button}
              variant="contained"
              sx={{
                fontSize: "12px",
                color: "primary.main",
                width: "20%",
                cursor: "pointer",
                marginRight: 10,
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              Aplicar Ahora
            </Typography>
          </Grid>
        </Box>
        <Grid
          sx={(t) => ({
            color: "secondary.body",
            [t.breakpoints.up("lg")]: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
            },
          })}
        >
          <Button
            variant="contained"
            sx={(t) => ({
              color: "secondary.body",
              [t.breakpoints.up("lg")]: {
                width: "50%",
                height: 50,
                textTransform: "none",
                fontWeight: 600,
                fontSize: 18,
              },
            })}
          >
            Actualizar Carrito
          </Button>
          <Button
            variant="contained"
            sx={(t) => ({
              color: "secondary.body",
              [t.breakpoints.up("lg")]: {
                width: "50%",
                height: 50,
                textTransform: "none",
                fontWeight: 600,
                fontSize: 18,
              },
            })}
          >
            Vaciar Carrito
          </Button>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            border={1}
            paddingX={2}
            paddingY={1}
            borderColor="primary.main"
            borderRadius={2}
            gap={1}
            sx={(t) => ({
              [t.breakpoints.up("lg")]: {
                width: "65%",
                height: "100%",
                textTransform: "none",
                fontWeight: 600,
                fontSize: 18,
              },
            })}
          >
            <Grid
              display="flex"
              justifyContent="space-between"
              sx={(t) => ({
                [t.breakpoints.up("lg")]: {
                  width: "60%",
                  height: "100%",
                  gap: 1,
                },
              })}
            >
              <Grid display="flex" flexDirection="column" gap={1}>
                <Typography color="text.cards" fontWeight={650}>
                  SubTotal
                </Typography>
                <Typography color="text.cards" fontWeight={650}>
                  Descuento
                </Typography>
                <Typography color="text.cards" fontWeight={650}>
                  Cupon
                </Typography>
              </Grid>
              <Grid display="flex" flexDirection="column" gap={1}>
                <Typography color="text.cards" fontWeight={650}>
                  $2.400.000
                </Typography>
                <Typography color="text.cards" fontWeight={650}>
                  0%
                </Typography>
                <Typography color="text.cards" fontWeight={650}>
                  123456789
                </Typography>
              </Grid>
            </Grid>
            <Divider orientation="horizontal" sx={{ color: "text.cards" }} />
            <Box
              width="100%"
              height={3}
              bgcolor="text.disabled"
              border={1}
              sx={(t) => ({
                display: "none",
                [t.breakpoints.up("lg")]: {
                  display: "flex",
                },
              })}
            ></Box>

            <Grid
              display="flex"
              justifyContent="space-between"
              sx={(t) => ({
                [t.breakpoints.up("lg")]: {
                  width: "60%",
                  height: "100%",
                  gap: 1,
                },
              })}
            >
              <Typography color="text.cards" fontWeight={650}>
                Total
              </Typography>
              <Typography color="text.cards" fontWeight={650}>
                $2.400.000
              </Typography>
            </Grid>
            <Button
              onClick={() => handlePagar()}
              variant="contained"
              sx={(t) => ({
                color: "secondary.body",
                [t.breakpoints.up("lg")]: {
                  width: "80%",
                  height: 50,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: 18,
                },
              })}
            >
              Proceder al pago
            </Button>
          </Box>
        </Grid>
      </Grid>

      {PagarComponent && <PayComponent />}
    </Grid>
  );
}

export default Checkout;
