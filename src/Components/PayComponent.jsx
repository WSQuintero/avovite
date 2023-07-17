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

function PayComponent() {
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
    setPagarComponent(false)
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
    <Grid display="flex" flexDirection="column">
      <Box
        position="absolute"
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        sx={{
          backgroundColor: "white",
        }}
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

        <Grid
          flexGrow={1}
          paddingX={4}
          paddingY={4}
          display="flex"
          flexDirection="column"
          gap={4}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            border={1}
            paddingX={2}
            paddingY={1}
            borderColor="primary.main"
            borderRadius={2}
            gap={1}
          >
            <Grid display="flex" justifyContent="space-between">
              <Typography color="primary.main" fontWeight={650}>
                Prodcuto
              </Typography>
              <Typography color="primary.main" fontWeight={650}>
                Subtotal
              </Typography>
            </Grid>

            <Grid display="flex" justifyContent="space-between">
              <Typography color="text.cards" fontWeight={650}>
                1 Vite
              </Typography>
              <Typography color="text.cards" fontWeight={650}>
                $2.400.000
              </Typography>
            </Grid>

            <Grid display="flex" justifyContent="space-between">
              <Grid display='flex' paddingY={2} flexDirection='column' gap={2}>
                <Typography color="text.cards" fontWeight={650}>
                  Pago por PSE
                </Typography>
                <Typography color="text.cards" fontWeight={650}>
                  Pago por Criptomoneda
                </Typography>
                <Typography color="text.cards" fontWeight={650}>
                  Pago por transacción
                </Typography>
              </Grid>
              <Grid display='flex' flexDirection='column' alignItems='center'>
              <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                      sx={{

                          "& .MuiSvgIcon-root": {
                            borderRadius: 100,
                        },
                      }}
                    />
                    <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                      sx={{
                        "& .MuiSvgIcon-root": {
                          borderRadius: 100,
                        },
                      }}
                    />
                    <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                      sx={{
                        "& .MuiSvgIcon-root": {
                          borderRadius: 100,
                        },
                      }}
                    />
                
               
                
              </Grid>
            </Grid>
            <Divider orientation="horizontal" sx={{ color: "text.cards" }} />
            <Grid display="flex" justifyContent="space-between">
              <Typography color="text.cards" fontWeight={650}>
                Total
              </Typography>
              <Typography color="text.cards" fontWeight={650}>
                $2.400.000
              </Typography>
            </Grid>
            <Button
              onClick={handlePagar}
              variant="contained"
              sx={{ color: "secondary.body" }}
            >
             Pagar
            </Button>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
}

export default PayComponent;
