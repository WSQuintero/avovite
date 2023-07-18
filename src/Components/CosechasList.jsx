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

import icon from '../assets/img/pasarDinero/icon.svg'

import { useFinalContext } from "../Context/FinalContext";

function CosechasList() {
  const theme = useTheme();
  const {transaction, setCosechasList, vites} = useFinalContext()
  const route = useNavigate()


  
  return (
    
      <Box
        position="absolute"
        height="100%"
        width='100%'
        display="flex"
        bgcolor='white'
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
        >
          <Button
            onClick={()=>setCosechasList(false)}
            sx={{
              marginLeft: 1,
              color: "secondary.body",
              textTransform: "none",
            }}
            startIcon={<KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />}
          >
           Cosechas
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
            <Typography variant="h2">Cosechas</Typography>
        { vites.map((e)=>(
            <>
          <Grid key={e.id} display='flex' alignItems='center'  width='100%' >
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
                <img src={icon} width='60%' height='60%' alt="logo"/>
            </Box>
            <Card
             key={e.id}
             elevation={0}
            
            >
                <CardActionArea sx={{ padding: 2 }} >
                    <Grid display="flex" flexDirection="column"  justifyContent='end'>
                      
                    

                      <Typography sx={{color:'primary.main', fontSize:18, fontWeight:600}}>
                        Vite {e.numeral}
                      </Typography>
                      <Typography sx={{color:'text.cards'}}>
                       
                      </Typography>
                      <Typography sx={{color:'text.cards'}}>
                        Cantidad: 2
                      </Typography>
                      <Typography sx={{color:'text.secondary', fontSize:14}}>
                        Estado: {e.estado}
                      </Typography>
                      <Typography sx={{color:'text.secondary', fontSize:14}}>
                        Fecha inicial: {e.siembra}
                      </Typography>
                      <Typography sx={{color:'text.secondary', fontSize:14}}>
                        cosecha: {e.dateAlistamiento}
                      </Typography>
                     
                    </Grid>
                  </CardActionArea>
            </Card>
          </Grid>

          <Box width='100%' height={1} bgcolor='text.disabled' border={1}></Box>
        </>
        ))
    }
        </Grid>
      </Box>

  );
}

export default CosechasList;





CosechasList