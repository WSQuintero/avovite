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

import BackgroundPhoto from "../assets/img/backgroundphoto.svg";
import logo from "../assets/img/logo.svg";
import { useTheme } from "@emotion/react";
import Header from "../Components/Header/Header";
import menuSidebar from "../assets/img/header menu copy.svg";
import imageProfile from "../assets/img/imageProfile.svg";
import photoDefault from "../assets/img/photoDefault.svg";
import vite from "../assets/img/profile/vite.svg";
import billetera from "../assets/img/profile/billetera.svg";
import compras from "../assets/img/profile/compras.svg";
import cosecha from "../assets/img/profile/cosecha.svg";
import ganancias from "../assets/img/profile/ganancias.svg";
import perfil from "../assets/img/profile/perfil.svg";
function Menu() {
  const theme = useTheme();
  const route= useNavigate()
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Grid display="flex" flexDirection="column">
      <Box
        position="relative"
        height="50vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
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

        {/* the filter of image */}
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
        >
          <Grid display="flex" flexDirection="column">
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
          >
            <img
              src={photoDefault}
              alt="logos"
              style={{ width: "80%", height: "80%" }}
            />
            <Button
              onClick={()=>route('/editPerfil')}
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

        <Grid
          paddingY={3}
          display="flex"
          width="90%"
          flexDirection="column"
          gap={2}
        >
          <Button
            variant="contained"
            fullWidth
            onClick={()=>route('/vites')}
            sx={{
              color: "white",
              justifyContent: "flex-start",
              textTransform: "none",
            }}
            startIcon={<img src={vite} width="50%" height="50%" />}
          >
            Vites
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={()=>route('/wallet')}
            sx={{
              color: "white",
              justifyContent: "flex-start",
              textTransform: "none",
            }}
            startIcon={<img src={billetera} width="50%" height="50%" />}
          >
            Billetera
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{
              color: "white",
              justifyContent: "flex-start",
              textTransform: "none",
            }}
            startIcon={<img src={cosecha} width="50%" height="50%" />}
          >
            Cosechas
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{
              color: "white",
              justifyContent: "flex-start",
              textTransform: "none",
            }}
            startIcon={<img src={ganancias} width="50%" height="50%" />}
          >
            Ganancias
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={()=>route('/products')}
            sx={{
              color: "white",
              justifyContent: "flex-start",
              textTransform: "none",
            }}
            startIcon={<img src={compras} width="50%" height="50%" />}
          >
            Comprar VITES
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={()=>route('/profile')}
            sx={{
              color: "white",
              justifyContent: "flex-start",
              textTransform: "none",
            }}
            startIcon={<img src={perfil} width="50%" height="50%" />}
          >
            Perfil
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
}

export default Menu;
