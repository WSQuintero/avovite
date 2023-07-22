import React, { useState, useEffect } from "react";
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
  KeyboardBackspace as KeyboardBackspaceIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

import { useTheme } from "@emotion/react";
import menuSidebar from "../assets/img/header menu copy.svg";
import imageProfile from "../assets/img/imageProfile.svg";
import photoDefault from "../assets/img/photoDefault.svg";
import vite from "../assets/img/profile/vite.svg";
import billetera from "../assets/img/profile/billetera.svg";
import compras from "../assets/img/profile/compras.svg";
import cosecha from "../assets/img/profile/cosecha.svg";
import ganancias from "../assets/img/profile/ganancias.svg";
import perfil from "../assets/img/profile/perfil.svg";
import { useFinalContext } from "../Context/FinalContext";
import CosechasList from "../Components/CosechasList";
import GanaciaList from "../Components/GanaciaList";
import GananciaTotalId from "../Components/GananciaTotalId";
import CargaCuenta from "../Components/CargaCuenta";
import MenuVites from "../Components/MenuVites";
import logoInformacion from "../assets/img/informacion/logoInformacion.svg";
import logoInfo from "../assets/img/MenuDesktop/info.svg";
import grafo1 from "../assets/img/MenuDesktop/Grafico1.svg";
import grafo2 from "../assets/img/MenuDesktop/Grafico 2.svg";
import MenuCountVites from "../Components/MenuCountVites";

function Menu() {
  const theme = useTheme();
  const route = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const {
    cosechasList,
    setCosechasList,
    gananciaList,
    setGananciaList,
    totalGananciaId,
    ComponentCargaCuenta,
  } = useFinalContext();

  const hanldeClickCosechas = () => {
    setCosechasList(true);
  };

  const handleClickGanancias = () => {
    setGananciaList(true);
  };

  return (
    <Grid display="flex" flexDirection="column">
      <Box
        position="relative"
        height="50vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={(theme) => ({
          [theme.breakpoints.up("lg")]: {
            display: "flex",
            
            gap:0,
          },
        })}
      >
        <Box
          sx={(theme) => ({
            [theme.breakpoints.up("lg")]: {
              display: "none",
             
            },
          })}
        >
          <img
            src={imageProfile}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
            alt="photo"
          />
        </Box>
        <Box
          position="absolute"
          left={0}
          top={0}
          width="100%"
          height={40}
          bgcolor="none"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          sx={(theme) => ({
            [theme.breakpoints.up("lg")]: {
              display: "none",
            },
          })}
        >
          <Button
            sx={{
              paddingLeft: 1,
              color: "secondary.body",
              textTransform: "none",
            }}
            startIcon={
              <img src={menuSidebar} width={20} height={20} alt="menuSidebar" />
            }
          />
          <Typography>Avovite App</Typography>

          <Button endIcon={<MoreVertIcon style={{ color: "white" }} />} />
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          position="absolute"
          justifyContent="space-between"
          alignItems="center"
          paddingX={1}
          left={30}
          bottom={0}
          top={0}
          gap={10}
          sx={(theme) => ({
            [theme.breakpoints.up("lg")]: {
              display: "none",
            },
          })}
        >
          <Grid
            display="flex"
            flexDirection="column"
            sx={(theme) => ({
              [theme.breakpoints.up("lg")]: {
                display: "none",
              },
            })}
          >
            <Typography variant="h2" sx={{ color: "white" }}>
              Nombre
            </Typography>
            <Typography sx={{ color: "secondary.body", fontSize: "12px" }}>
              nombre@gmail.com
            </Typography>
            <Typography sx={{ color: "secondary.body", fontSize: "12px" }}>
              ciudad
            </Typography>
          </Grid>

          <Grid
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            marginBottom={5}
            sx={(theme) => ({
              [theme.breakpoints.up("lg")]: {
                display: "none",
              },
            })}
          >
            <img
              src={photoDefault}
              alt="logos"
              style={{ width: "80%", height: "80%" }}
            />
            <Button
              onClick={() => route("/editPerfil")}
              sx={{
                bottom: 20,
                textTransform: "none",
                color: "secondary.body",
              }}
            >
              Editar Perfil
            </Button>
          </Grid>
        </Box>

        {/*component Desktop */}
        <Box
          sx={(theme) => ({
            display:'none',
            [theme.breakpoints.up("lg")]: {
              marginTop: 10,
              display: "flex",
              gap: 1,
            },
          })}
        >
          <MenuVites />
          <Box borderRadius={2} bgcolor="#344B2C" width={536} height={333}>
            <img src={grafo1} />
          </Box>
        </Box>
        <Box
          sx={(theme) => ({
            display:'none',
            [theme.breakpoints.up("lg")]: {
              marginTop: 2,
              display: "flex",
              gap: 1,
            },
          })}
        >
        <Box borderRadius={2} border={1} borderColor='primary.main' bgcolor="white" width={536} height={333} display='flex' justifyContent='center' alignItems='center'>
        <img  width="90%" height="90%" src={grafo2} />
      </Box>
      <MenuCountVites/>
      </Box>

      </Box>

      <Grid
        paddingY={3}
        paddingX={5}
        display="flex"
        width="100%"
        flexDirection="column"
        gap={2}
      >
        <Button
          variant="contained"
          fullWidth
          onClick={() => route("/vites")}
          sx={(theme) => ({
            color: "white",
            justifyContent: "flex-start",
            textTransform: "none",

            [theme.breakpoints.up("lg")]: {
              display: "none",
            },
          })}
          startIcon={<img src={vite} width="50%" height="50%" />}
        >
          Vites
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => route("/wallet")}
          sx={(theme) => ({
            color: "white",
            justifyContent: "flex-start",
            textTransform: "none",

            [theme.breakpoints.up("lg")]: {
              display: "none",
            },
          })}
          startIcon={<img src={billetera} width="50%" height="50%" />}
        >
          Billetera
        </Button>
        <Button
          onClick={() => hanldeClickCosechas()}
          variant="contained"
          fullWidth
          sx={(theme) => ({
            color: "white",
            justifyContent: "flex-start",
            textTransform: "none",

            [theme.breakpoints.up("lg")]: {
              display: "none",
            },
          })}
          startIcon={<img src={cosecha} width="50%" height="50%" />}
        >
          Cosechas
        </Button>
        <Button
          onClick={() => handleClickGanancias()}
          variant="contained"
          fullWidth
          sx={(theme) => ({
            color: "white",
            justifyContent: "flex-start",
            textTransform: "none",

            [theme.breakpoints.up("lg")]: {
              display: "none",
            },
          })}
          startIcon={<img src={ganancias} width="50%" height="50%" />}
        >
          Ganancias
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => route("/products")}
          sx={(theme) => ({
            color: "white",
            justifyContent: "flex-start",
            textTransform: "none",

            [theme.breakpoints.up("lg")]: {
              display: "none",
            },
          })}
          startIcon={<img src={compras} width="50%" height="50%" />}
        >
          Comprar VITES
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => route("/profile")}
          sx={(theme) => ({
            color: "white",
            justifyContent: "flex-start",
            textTransform: "none",

            [theme.breakpoints.up("lg")]: {
              display: "none",
            },
          })}
          startIcon={<img src={perfil} width="50%" height="50%" />}
        >
          Perfil
        </Button>
      </Grid>

      {cosechasList && <CosechasList />}

      {gananciaList && <GanaciaList />}
      {totalGananciaId !== null && <GananciaTotalId />}
      {ComponentCargaCuenta !== null && <CargaCuenta />}
    </Grid>
  );
}

export default Menu;
