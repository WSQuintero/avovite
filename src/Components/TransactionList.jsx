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
  
  KeyboardBackspace as KeyboardBackspaceIcon,
  MoreVert as MoreVertIcon,
  ShoppingCart as ShoppingCartIcon,

} from "@mui/icons-material";

import { useTheme } from "@emotion/react";
import Header from "../Components/Header/Header";
import logoInformacion from '../assets/img/informacion/logoInformacion.svg'
import { useFinalContext } from "../Context/FinalContext";
import { transacciones } from "../utilities/myCards";
import BancInformation from "./BancInformation";

function TransactionList() {
  const theme = useTheme();
  const {transaction, setTransaction} = useFinalContext()
  const route = useNavigate()


  
  return (
    
      <Box
        position="absolute"
        display="flex"
        bgcolor='white'
        flexDirection="column"
        sx={(theme)=>({
          height:'100%',
         width:'100%',

          [theme.breakpoints.up('lg')]:{
            height:'300vh',
            border:1,
            borderColor:'red',
         width:'150vw',
         bgcolor:'white',
         marginLeft:-80,
        
        
          }
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
            onClick={()=>setTransaction(false)}
            sx={{
              marginLeft: 1,
              color: "secondary.body",
              textTransform: "none",
            }}
            startIcon={<KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />}
          >
           Mis VITES
          </Button>
          <Button 
          
          onClick={()=>route('/checkout')}
          variant="contained" sx={{ height: "100%", bgcolor:'#498A19' }}>
            <ShoppingCartIcon sx={{ color: "secondary.body" }} />
          </Button>
        </Box>


        {/* the filter of image */}

        <Grid
          paddingX={2}
          paddingY={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={1}
        >
        { transacciones.map((e)=>(
            <>
          <Grid key={e.id}
          
          sx={(theme)=>({
            display:'flex',
            alignItems:'center',
            width:'100%',
            [theme.breakpoints.up('lg')]:{
              display:'none',
            }
          })}
          >
            <Box
             bgcolor='primary.main'
             borderRadius='50%'
             display='flex'
             justifyContent='center'
             alignItems='center'
             marginBottom={10}
             marginLeft={4}
             sx={{
                width:40,
                height:40
             }}
            >
                <img src={logoInformacion} width='60%' height='60%' alt="logo"/>
            </Box>
            <Card
             key={e.id}
             elevation={0}
            
            >
                <CardActionArea sx={{ padding: 2 }} >
                    <Grid display="flex" flexDirection="column"  justifyContent='end'>
                      
                    

                      <Typography sx={{color:'primary.main', fontSize:18, fontWeight:600}}>
                        {e.name}
                      </Typography>
                      <Typography sx={{color:'text.cards'}}>
                        valor: ${" "}{e.valor}
                      </Typography>
                      <Typography sx={{color:'text.cards'}}>
                        Cantidad:{" "}{e.cantidad}
                      </Typography>
                      <Typography sx={{color:'text.secondary', fontSize:14}}>
                        {e.date}
                      </Typography>
                     
                    </Grid>
                  </CardActionArea>
            </Card>
          </Grid>

          <Box width='100%' height={1} bgcolor='text.disabled' border={1}
          
          sx={(theme)=>({
            height:1,
            border:1,
            bgcolor:'text.disabled',
            [theme.breakpoints.up('lg')]:{
              display:'none'
            }
          })}
          ></Box>
        </>
        ))
      }
      <BancInformation/>
        </Grid>
      </Box>

  );
}

export default TransactionList;



