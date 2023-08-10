import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Button, Typography } from "@mui/material";
import { KeyboardBackspace as KeyboardBackspaceIcon } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

function TermsConditions() {
  const theme = useTheme();
  const route = useNavigate();
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
    <Grid
      display="flex"
      flexDirection="column"
      sx={(theme) => ({
        [theme.breakpoints.up("lg")]: {
          marginTop: 10,
        },
      })}
    >
      <Box position="relative" height="10vh" display="flex" flexDirection="column">
        <Box
          width="100%"
          height={40}
          bgcolor="#67AA36"
          sx={(theme) => ({
            [theme.breakpoints.up("lg")]: {
              display: "none",
            },
          })}
        >
          <Button
            onClick={() => route("/signin")}
            sx={(theme) => ({
              marginLeft: 1,
              color: "secondary.body",
              textTransform: "none",
              [theme.breakpoints.up("lg")]: {
                display: "none",
              },
            })}
            startIcon={<KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />}
          >
            Registro
          </Button>
        </Box>

        {/* the filter of image */}

        <Grid
          display="flex"
          flexDirection="column"
          sx={(theme) => ({
            paddingX: 5,
            paddingY: 2,
            [theme.breakpoints.up("lg")]: {
              paddingX: 30,
              paddingY: 6,
            },
          })}
        >
          <Box>
            <Grid display="flex" flexDirection="column" justifyContent="center">
              <Typography color="primary.main" textAlign="center" sx={{ fontSize: "25px", fontWeight: 600 }}>
                Términos y Condiciones
              </Typography>
              <Typography
                color="text.cards"
                ref={typographyRef}
                textAlign="justify"
                lineHeight={2}
                sx={(theme) => ({
                  maxHeight: "500px", // Ajusta la altura máxima deseada
                  overflowY: "scroll",
                  scrollbarWidth: "thin",
                  padding: "20px",
                  [theme.breakpoints.up("lg")]: {
                    maxHeight: 500, // Ajusta la altura máxima deseada
                    overflowY: "scroll",

                    scrollbarWidth: "thin",
                    padding: 4,
                  },
                })}
              >
                Términos y Condiciones de Uso de la Aplicación Avovite app Por favor, lea detenidamente los siguientes
                términos y condiciones antes de utilizar la aplicación (" Avovite app"). Estos Términos constituyen un
                acuerdo legalmente vinculante entre usted ("el Usuario") y [Avovite S.A.S] Al utilizar la Aplicación,
                usted acepta cumplir con estos Términos en su totalidad. Si no está de acuerdo con alguno de los
                términos o condiciones aquí establecidos, le pedimos que no utilice la Aplicación. Aplicación, usted
                acepta cumplir con estos Términos en su totalidad. Si no está de acuerdo con alguno de los términos o
                condiciones aquí establecidos, le pedimos que no utilice la Aplicación. Aplicación, usted acepta cumplir
                con estos Términos en su totalidad. Si no está de acuerdo con alguno de los términos o condiciones aquí
                establecidos, le pedimos que no utilice la Aplicación.{" "}
              </Typography>

              {/* <div style={{ textAlign: "center" }}>
                Porcentaje de desplazamiento: {scrollPercentage.toFixed(2)}%
              </div> */}
            </Grid>
          </Box>

          <Grid display="flex" gap={2}>
            <Button onClick={() => route("/inscription")} variant="contained" fullWidth sx={{ color: "white" }}>
              Aceptar
            </Button>
            <Button onClick={() => route("/signin")} variant="contained" fullWidth sx={{ color: "white" }}>
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default TermsConditions;
