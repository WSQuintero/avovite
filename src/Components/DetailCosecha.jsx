import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link as RouterLink, Route } from "react-router-dom";
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
  WhatsApp as WhatsAppIcon,
} from "@mui/icons-material";

import BackgroundPhoto from "../assets/img/backgroundphoto.svg";
import logo from "../assets/img/logo.svg";

import { useTheme } from "@emotion/react";
import Header from "../Components/Header/Header";
import { useFinalContext } from "../Context/FinalContext";
import ModalCheckout from "../Components/Modals/ModalCheckout";
import { bancos } from "../utilities/myCards";

function DetailCosecha() {
  const theme = useTheme();
  const { productoViteId, setProductoViteId, setCosechaMinimaDetail, cosechaMinimaDetail } = useFinalContext();
  const route = useNavigate();
  const [PasswordClic, setPasswordClic] = useState(false);
  const typographyRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleModalCheck = () => {
    setformBanck(null);
    setDetailTransaction(null);
  };
  const handleCloseForm = () => {
    setCosechaMinimaDetail(null)
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = typographyRef.current;
      const scrollableHeight = scrollHeight - clientHeight;
      const percentage = (scrollTop / scrollableHeight) * 100;
      setScrollPercentage(percentage);
    };

    const typographyElement = typographyRef.current;
    typographyElement.addEventListener("scroll", handleScroll);

    return () => {
      typographyElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      position="absolute"
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems='center'
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
          startIcon={<KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />}
        >
         Cosecha minima
        </Button>
        <Button
          onClick={()=>route('/checkout')}

          variant="contained"
          sx={{ height: "80%", bgcolor: "#498A19" }}
          endIcon={<ShoppingCartIcon sx={{ color: "secondary.body" }} />}
        ></Button>
      </Box>

      {/* the filter of image */}

      <Grid
        flexGrow={1}
        paddingX={4}
        paddingY={4}
        display="flex"
        flexDirection="column"
       
      >
        <Typography color="primary.main" fontWeight={600} sx={{fontSize:24, textAlign:'initial'}}>
          Cosecha Mínima
        </Typography>

        <Typography
          color="black"
          ref={typographyRef}
          textAlign="justify"
          lineHeight={2}
          style={{
            maxHeight: "500px", // Ajusta la altura máxima deseada
            overflowY: "scroll",
            scrollbarWidth: "thin",
            padding: "20px",
          }}
        >
          La cosecha mínima del Vite es una medida establecida para garantizar
          la sostenibilidad y calidad de los cultivos. Se refiere a la cantidad
          mínima de aguacates que se deben recolectar de un árbol antes de que
          esté listo para la venta o consumo. Imaginemos que tienes un pequeño
          huerto de aguacate con 50 árboles y deseas saber cuántos aguacates
          debes recolectar como mínimo para mantener un nivel adecuado de
          producción y aprovechamiento del cultivo. En promedio, cada árbol de
          aguacate puede producir alrededor de 100 frutos en una temporada. Sin
          embargo, para garantizar un buen crecimiento y desarrollo de los
          árboles, es recomendable dejar una cantidad mínima de frutos en el
          árbol.
        </Typography>

        <div style={{ textAlign: "center" }}>
          Porcentaje de desplazamiento: {scrollPercentage.toFixed(2)}%
        </div>
      <Box
           
            marginTop='2%'
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
          </Box>
      </Grid>
    </Box>
  );
}

export default DetailCosecha;
