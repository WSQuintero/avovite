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
import { certifcates } from "../utilities/myCards";
import contrato from "../assets/img/certificate/contrato.svg";
import certificate from "../assets/img/certificate/certificate.svg";
import recivo from "../assets/img/certificate/found.svg";
import CertificateCards from "../Components/CertificateCards";

function Certificate() {
  const theme = useTheme();
  const { vites } = useFinalContext();
  const route = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [PasswordClic, setPasswordClic] = useState(false);

  return (
    <Grid display="flex" flexDirection="column"  sx={(t)=>({
     
      [t.breakpoints.up('lg')]:{
       marginTop:10,
      }
    })}>
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
          sx={(t)=>({
            marginTop:7,
            [t.breakpoints.up('lg')]:{
              display:'none'
            }
          })}
          >
          <Button
          onClick={() => route("/vites")}
            sx={{
              marginLeft: 1,
              color: "secondary.body",
              textTransform: "none",
            }}
            startIcon={
              <KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />
            }
          >
            Mis VITES
          </Button>
          <Button
          onClick={()=>route('/checkout')}

            variant="contained"
            sx={{ height: "100%", bgcolor: "#498A19" }}
          >
            <ShoppingCartIcon sx={{ color: "secondary.body" }} />
          </Button>
        </Box>
        </Box>
        {/* the filter of image */}

        <Grid
          paddingX={2}
          paddingY={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={1}
          sx={(t)=>({
          
            [t.breakpoints.up('lg')]:{
              display:'none'
            }
          })}
        >
          {certifcates.map((e) => (
            <>
              <Grid
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                paddingLeft={2}
                // onClick={() => route(`vite/${e.id}`)}
              >
                <Box
                  bgcolor="primary.main"
                  borderRadius="50%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    width: 80,
                    height: 60,
                  }}
                >
                  {e.id === 0 && (
                    <img width={35} height={35} src={contrato} alt="logo" />
                  )}
                  {e.id === 1 && (
                    <img width={35} height={35} src={certificate} alt="logo" />
                  )}
                  {e.id === 2 && (
                    <img width={35} height={35} src={recivo} alt="logo" />
                  )}
                </Box>
                <Card key={e.id} elevation={0}>
                  <CardActionArea sx={{ padding: 2 }}>
                    <Grid display="flex" flexDirection="column">
                      <Typography
                        sx={{
                          color: "primary.main",
                          fontSize: 20,
                          fontWeight: 500,
                        }}
                      >
                        {e.title}
                      </Typography>
                      <Typography sx={{ color: "text.cards" }}>
                        {e.text}
                      </Typography>

                      <Link
                        component={RouterLink}
                        to="/termsandConditions"
                        onClick={() => setPasswordClic(!PasswordClic)}
                        sx={{
                          cursor: "pointer",
                          color: PasswordClic ? "secondary.main" : "#67AA36",
                          fontSize: 12,
                          transition: "color 0.2s ease-in-out",
                          textDecoration: "none",
                          "&:hover": {
                            color: "secondary.main", // Cambia el color al puntero estar encima del enlace
                          },
                        }}
                      >
                        {e.link}
                      </Link>
                    </Grid>
                  </CardActionArea>
                  <Box
                    width="100%"
                    height={1}
                    bgcolor="primary.main"
                    borderColor='primary.main'
                    border={1}
                  ></Box>
                </Card>
              </Grid>
            </>
          ))}
        </Grid>
      
      <CertificateCards/>
    </Grid>
  );
}

export default Certificate;
