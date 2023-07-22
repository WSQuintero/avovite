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
import logoInformacion from '../assets/img/informacion/logoInformacion.svg'
import { useFinalContext } from "../Context/FinalContext";

function Informaicion() {
  const theme = useTheme();
  const {vites} = useFinalContext()
  const route = useNavigate()

  return (
    <Grid display="flex" flexDirection="column">
      <Box
        position="relative"
        height="10vh"
        display="flex"
        flexDirection="column"
      >
        <Header  />

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
              onClick={()=>route('/informacion')}

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
        { vites.map((e)=>(
            <>
          <Grid key={e.id} display='flex' alignItems='center' justifyContent='space-between' width='100%' paddingLeft={2} onClick={()=>route(`vite/${e.id}`)} >
            <Box
             bgcolor='primary.main'
             borderRadius='50%'
             display='flex'
             justifyContent='center'
             alignItems='center'
             sx={{
                width:60,
                height:60
             }}
            >
                <img src={logoInformacion} alt="logo"/>
            </Box>
            <Card
             key={e.id}
             elevation={0}
            
            >
                <CardActionArea sx={{ padding: 2 }} >
                    <Grid display="flex" flexDirection="column" >
                      
                    

                      <Typography sx={{color:'primary.main', fontSize:25, fontWeight:500}}>
                        {e.numeral}
                      </Typography>
                      <Typography sx={{color:'text.cards'}}>
                        Estado{" "}{e.estado}
                      </Typography>
                      <Typography sx={{color:'text.secondary', fontSize:14}}>
                        {e.download}
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
    </Grid>
  );
}

export default Informaicion;
