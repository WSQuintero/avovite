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

import { useTheme } from "@emotion/react";
import Header from "../Components/Header/Header";
import iconG from "../assets/img/pasarDinero/iconG.svg";
import icon from "../assets/img/pasarDinero/icon.svg";
import photoDefault from "../assets/img/photoDefault.svg";
import { useFinalContext } from "../Context/FinalContext";
import FormCountBank from "../Components/FormCountBank";
import { bancos } from "../utilities/myCards";
import TransactionDetail from "../Components/TransactionDetail";
import logoInformacion from '../assets/img/informacion/logoInformacion.svg'

function PasarDinero() {
  const theme = useTheme();
  const route = useNavigate();
  const { formBanck, setformBanck, DetailTransaction } = useFinalContext();

  // console.log(bancos)

  const handleFormCount = (id) => {
    setformBanck(id);
  };
  console.log(formBanck);

  return (
    <Grid display="flex" flexDirection="column" sx={(theme)=>({
     

      [theme.breakpoints.up('lg')]:{
      
       
      }
    })}>
      <Box
        height="10vh"
        display="flex"
        flexDirection="column"
        sx={(theme) => ({
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
          bottom: 0,
          top: 0,
          gap: 7,
          [theme.breakpoints.up("lg")]: {
            marginTop: 10,
            flexDirection: "column",
            alignItems: "center",
            marginLeft: -10,
            width: "100%",
            gap: 0,
          },
        })}
      >
        <Header />

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
            onClick={() => route("/wallet")}
            sx={{
              marginLeft: 1,
              color: "secondary.body",
              textTransform: "none",
            }}
            startIcon={
              <KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />
            }
          >
            Editar Perfil
          </Button>
        </Box>

        {/* the filter of image */}
        <Typography
          variant="h2"
          sx={(theme) => ({
            display: "none",
            [theme.breakpoints.up("lg")]: {
              display: "flex",
              marginLeft: -108,
              marginTop: 10,
            },
          })}
        >
          Pasar Dinero
        </Typography>
        <Box
          sx={(theme) => ({
            display: "none",
            [theme.breakpoints.up("lg")]: {
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop:1,
              width: "100%",
            },
          })}
        >
          <Box
            sx={(theme) => ({
              [theme.breakpoints.up("lg")]: {},
            })}
          >
            <img
              src={photoDefault}
              alt="logos"
              style={{ width: "40%", height: "40%" }}
            />
          </Box>

          <Grid
            display="flex"
            flexDirection="column"
            sx={(theme) => ({
              [theme.breakpoints.up("lg")]: {
                marginLeft: -20,
              },
            })}
          >
            <Typography
              sx={(theme) => ({
                color: "white",
                fontSize: 15,
                [theme.breakpoints.up("lg")]: {
                  color: "primary.main",
                  fontSize: 19,
                  fontWeight: 200,
                },
              })}
            >
              Tu Dinero
            </Typography>
            <Typography
              marginRight={10}
              width="100%"
              sx={(theme) => ({
                color: "secondary.body",
                fontSize: 18,
                fontWeight: 600,
                [theme.breakpoints.up("lg")]: {
                  color: "primary.main",
                  fontSize: 19,
                  fontWeight: 600,
                },
              })}
            >
              $ 5.000.000
            </Typography>
          </Grid>
        </Box>
      </Box>
      <Grid
        paddingY={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box
          sx={(theme) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            [theme.breakpoints.up("lg")]: {
              display: "none",
            },
          })}
        >
          <img src={photoDefault} width="50%" height="50%" alt="photo" />

          <Typography bottom={10} color="primary.main">
            Nombre
          </Typography>
          <Typography bottom={10} color="primary.main">
            $ 5.000.000
          </Typography>
        </Box>

        <Box
          display="flex"
          sx={(theme) => ({
            paddingY: 3,
            flexDirection: "column",
            width: "90%",
            gap: 2,
            [theme.breakpoints.up("lg")]: {
              display: "flex",

              flexWrap: "wrap",
              width: "70vw",
              height: "80vh",
              marginTop: 30,
              marginRight: 20,
              gap: 6,
            },
          })}
        >
          {bancos.map((e) => (
            <>
           
            <Box
              component={Button}
              variant="contained"
              fullWidth
              onClick={() => handleFormCount(e.id)}
              sx={(theme) => ({
                display: "none",
                color: "white",
                justifyContent: "flex-start",
                textTransform: "none",
                height: 50,

                [theme.breakpoints.up("lg")]: {
                  display: "flex",
                  flexDirection:'column',
                  bgcolor: "primary.main",
                  borderRadius: 2,
                  paddingTop:5,
                  width: 258,
                  height: 176,
                },
              })}
            > 
              <Box
              
               sx={(theme)=>({
                
                [theme.breakpoints.up('lg')]:{
                  bgcolor:"white",
                  width:52,
                  height:40,
                  borderRadius:1,
                  display:'flex',
                  justifyContent:'center',
                  alignItems:'center',
                 marginRight:22,
                
                }
               })}
              >

              <img src={iconG} />
              </Box>
              <Grid sx={(t)=>({
                [t.breakpoints.up('lg')]:{
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'space-between',
                  marginTop:5,
                  marginRight:5,
                  gap:14,

                }
              })}>

              <Typography sx={(theme)=>({
              })}>{e.banco}</Typography>
              <Box sx={(t)=>({
                [t.breakpoints.up('lg')]:{
                  display:'flex',
                  

                }
              })}>

                <img  src={logoInformacion} style={{marginRight:-191, marginTop:-5}}/>
              </Box>

              </Grid>
            </Box>
             <Box
             component={Button}
             variant="contained"
             fullWidth
             onClick={() => handleFormCount(e.id)}
             sx={(theme) => ({
               display: "flex",
               color: "white",
               justifyContent: "flex-start",
               textTransform: "none",
               height: 50,
                gap:5,
               [theme.breakpoints.up("lg")]: {
                 display: "none",
                
               },
             })}
           > 
             
             <img src={icon} />
             
             

             {e.banco}
             

             
           </Box>
           </>
          ))}
        
        </Box>
      </Grid>

      {formBanck !== null && <FormCountBank />}

      {DetailTransaction !== null && <TransactionDetail />}
    </Grid>
  );
}

export default PasarDinero;
