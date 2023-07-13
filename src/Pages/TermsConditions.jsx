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
} from "@mui/material";
import {
  Https as HttpsIcon,
  LockOutlined as LockOutlinedIcon,
  MailOutline as MailOutlineIcon,
  Person,
  KeyboardBackspace as KeyboardBackspaceIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

import BackgroundPhoto from "../assets/img/backgroundphoto.svg";
import logo from "../assets/img/logo.svg";

import { useTheme } from "@emotion/react";
import Header from "../Components/Header/Header";

function TermsConditions() {
  const theme = useTheme();

  const [isClicked, setIsClicked] = useState(false);
  const [PasswordClic, setPasswordClic] = useState(false);
  const typographyRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
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
    <Grid display="flex" flexDirection="column">
      <Box position='relative' height="10vh" display="flex" flexDirection="column">

        <Header/>

        <Box width="100%" height={40} bgcolor="#67AA36">
          <Button
            sx={{
              marginLeft: 1,
              color: "secondary.body",
              textTransform: "none",
            }}
            startIcon={
              <KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />
            }
          >
            Registro
          </Button>
        </Box>

        {/* the filter of image */}

        <Grid paddingX={5} paddingY={2} display="flex" flexDirection="column">
          <Box>
            <Grid
              display="flex"
              flexDirection="column"
              justifyContent="center"
             
            >
              <Typography color="primary.main" textAlign="center" sx={{fontSize:'25px', fontWeight:600}}>
                Términos y Condiciones
              </Typography>
              <Typography
                color="black"
                ref={typographyRef}
                textAlign='justify'
                lineHeight={2}
                style={{
                  maxHeight: "500px", // Ajusta la altura máxima deseada
                  overflowY: "scroll",
                  scrollbarWidth: "thin",
                  padding: "20px",
                }}
              >
                Términos y Condiciones de Uso de la Aplicación Avovite app Por
                favor, lea detenidamente los siguientes términos y condiciones
                antes de utilizar la aplicación (" Avovite app"). Estos Términos
                constituyen un acuerdo legalmente vinculante entre usted ("el
                Usuario") y [Avovite S.A.S] Al utilizar la Aplicación, usted
                acepta cumplir con estos Términos en su totalidad. Si no está de
                acuerdo con alguno de los términos o condiciones aquí
                establecidos, le pedimos que no utilice la Aplicación.
                Aplicación, usted acepta cumplir con estos Términos en su
                totalidad. Si no está de acuerdo con alguno de los términos o
                condiciones aquí establecidos, le pedimos que no utilice la
                Aplicación. Aplicación, usted acepta cumplir con estos Términos
                en su totalidad. Si no está de acuerdo con alguno de los
                términos o condiciones aquí establecidos, le pedimos que no
                utilice la Aplicación.{" "}
              </Typography>

              <div style={{ textAlign: "center" }}>
                Porcentaje de desplazamiento: {scrollPercentage.toFixed(2)}%
              </div>
            </Grid>
          </Box>

         
          <Grid display="flex" gap={2}>
            <Button variant="contained" fullWidth sx={{ color: "white" }}>
              Aceptar
            </Button>
            <Button variant="contained" fullWidth sx={{ color: "white" }}>
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default TermsConditions;
