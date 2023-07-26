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
} from "@mui/icons-material";

import BackgroundPhoto from "../assets/img/backgroundphoto.svg";
import logo from "../assets/img/logo.svg";

import { useTheme } from "@emotion/react";
import Header from "../Components/Header/Header";
import { useFinalContext } from "../Context/FinalContext";
import ModalCheckout from "../Components/Modals/ModalCheckout";
import { bancos } from "../utilities/myCards";
function TransactionDetail() {
  const theme = useTheme();
  const { formBanck, setformBanck, setDetailTransaction } = useFinalContext();
  const route = useNavigate();
  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log(data);
  //   };
  // console.log(formBanck)
  const handleModalCheck = () => {
    setformBanck(null);
    setDetailTransaction(null);
  };
  const handleCloseForm = () => {
    setformBanck(null);
    setDetailTransaction(null);
  };
  const filterBanck = bancos.find((e) => e.id == formBanck);

  return (
    <Box
      position="absolute"
      
      display="flex"
      flexDirection="column"
      sx={(theme)=>({
       
        backgroundColor:'white',
        height:"150%",
            width:"100%",
        [theme.breakpoints.up('lg')]:{
          backgroundColor:'#FFFFFF',
          
          height:'2000vh',
          width:'200vh',
         marginLeft:-20,
          marginTop:10,
        }
    })}
    >
      <Header />

      <Box width="100%" height={40} bgcolor="#67AA36"
      sx={(theme)=>({
        display:'flex',
        width:'100%',
        height:40,
        marginTop:7,
        [theme.breakpoints.up('lg')]:{
          display:'none'

        }
      })}
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
          {filterBanck.banco}
        </Button>
      </Box>

      {/* the filter of image */}
      <Typography variant='h3' sx={(theme)=>({
              display:'none',
              [theme.breakpoints.up('lg')]:{
                display:'flex',
                marginLeft:15,
                marginTop:10,
                
              }
          
        })}>{filterBanck.banco}</Typography>
      <Grid display="flex" flexDirection="column"
      
      sx={(theme)=>({
        justifyContent:'center',
        alignItems:'center',
        paddingX:0,
        paddingY:4,
        [theme.breakpoints.up('lg')]:{
          border:1,
          borderColor:'primary.main',
          marginLeft:50,
          marginTop:5,
          paddingBottom:10,
         borderRadius:3,
          width:500,
          height:500,
        }
      })}>
        <Grid
          
          display="flex"
          flexDirection="column"
          gap={2}
          sx={(theme)=>({
            paddingX:4,
            paddingY:4,
            alignItems:'center',
            justifyContent:'center',
            width:'100%',
            height:'100%',
            [theme.breakpoints.up('lg')]:{
              marginTop:5,
              width:'100%',
              height:'100%',
            }
          })}
        >
          <Typography variant="h2" color="primary.main" fontWeight={549}>
            Datos de trasferencia{" "}
          </Typography>

          <Grid  sx={(theme)=>({
            
            [theme.breakpoints.up('lg')]:{
              width:'100%',
              marginLeft:10,
            }
          })}>
            <Typography color="primary.main"  sx={(theme)=>({
            
            [theme.breakpoints.up('lg')]:{
              width:'100%',
              fontSize:18,
            }
          })}>
              Fecha y hora de transacción
            </Typography>
            <Typography color="text.cards"  sx={(theme)=>({
              
            [theme.breakpoints.up('lg')]:{
              width:'100%',
              fontSize:18,
            }
          })}>
              Transacción {filterBanck.banco}
            </Typography>
            <Typography color="text.cards"  sx={(theme)=>({
            
            [theme.breakpoints.up('lg')]:{
              width:'100%',
              fontSize:18,
            }
          })}>2024/06/07 - 13:27:31 </Typography>
          </Grid>

          <Box width="100%" height={1} bgcolor="text.disabled" border={1}  sx={(theme)=>({
             display:'flex',
            
            [theme.breakpoints.up('lg')]:{
             display:'none'
              
            }
          })}></Box>

          <Grid sx={(theme)=>({
            
            [theme.breakpoints.up('lg')]:{
              width:'100%',
              marginLeft:10,
            }
          })}>
            <Typography color="primary.main" sx={(theme)=>({
            
            [theme.breakpoints.up('lg')]:{
              width:'100%',
              fontSize:18,
            }
          })}>Origen</Typography>
            <Typography color="text.cards" sx={(theme)=>({
            
            [theme.breakpoints.up('lg')]:{
              width:'100%',
              fontSize:18,
            }
          })}>
            Cuenta Avovite: 

            </Typography>
            <Typography color="text.cards" sx={(theme)=>({
            
            [theme.breakpoints.up('lg')]:{
              width:'100%',
              fontSize:18,
            }
          })}>N: *********0413</Typography>
          </Grid>
          <Box width="100%" height={1} bgcolor="text.disabled" border={1} sx={(theme)=>({
             display:'flex',
            
            [theme.breakpoints.up('lg')]:{
             display:'none'
              
            }
          })}></Box>
          <Grid sx={(theme)=>({
            
            [theme.breakpoints.up('lg')]:{
              width:'100%',
              marginLeft:10,
            }
          })}>
            <Typography color="primary.main" sx={(theme)=>({
            
            [theme.breakpoints.up('lg')]:{
              width:'100%',
              fontSize:18,
            }
          })}>
            Valor de transacción 
            </Typography>
            <Typography color="text.cards" sx={(theme)=>({
            
            [theme.breakpoints.up('lg')]:{
              width:'100%',
              fontSize:18,
            }
          })}>
            $ 1.000.000  
            </Typography>
            
          </Grid>

          <Box width="100%" height={1} bgcolor="text.disabled" border={1} sx={(theme)=>({
             display:'flex',
            
            [theme.breakpoints.up('lg')]:{
             display:'none'
              
            }
          })}></Box>

          <Grid sx={(theme)=>({
            
            [theme.breakpoints.up('lg')]:{
              width:'100%',
              marginLeft:10,
            }
          })}>
            <Typography color="primary.main" sx={(theme)=>({
            
            [theme.breakpoints.up('lg')]:{
              width:'100%',
              fontSize:18,
            }
          })}>
              Numero de autorización 
            </Typography>
            <Typography color="text.cards" sx={(theme)=>({
            
            [theme.breakpoints.up('lg')]:{
              width:'100%',
              fontSize:18,
            }
          })}>
            008473
            </Typography>
            
          </Grid>
        </Grid>

        <Grid paddingX={4} display="flex" gap={2}>
          <Button
            variant="contained"
            onClick={handleModalCheck}
            fullWidth
            sx={{ color: "white" }}
          >
            Aceptar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TransactionDetail;
