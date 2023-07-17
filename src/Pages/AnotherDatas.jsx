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
  ShoppingCart as ShoppingCartIcon,
  LightbulbOutlined as LightbulbOutlinedIcon,
  WhatsApp as WhatsAppIcon,
} from "@mui/icons-material";

import { useTheme } from "@emotion/react";
import Header from "../Components/Header/Header";
import photoDefault from "../assets/img/photoDefault.svg";
import viteplant from "../assets/img/viteplant.svg";
import perspective from '../assets/img/anotherdata/perspective.svg'
import requisito from '../assets/img/anotherdata/requisito.svg'
import valoracion from '../assets/img/anotherdata/valoracion.svg'
import potencial from '../assets/img/anotherdata/potencial.svg'


function AnotherDatas() {
  const theme = useTheme();
  const route = useNavigate()

  return (
    <Grid display="flex" flexDirection="column">
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
        >
          <Button
          onClick={()=>route('/vites')}
            sx={{
              marginLeft: 1,
              color: "secondary.body",
              textTransform: "none",
            }}
            startIcon={<KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />}
          >
           Otros Datos
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
        >
        
          <Grid
            display="flex"
            paddingY={25}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <Grid display="flex" gap={2}>
              <Box
                bgcolor="primary.main"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width={140}
                height={90}
                gap={1}
                borderRadius={2}
                onClick = {()=>route('/anotherData/1')}

                sx={{cursor:'pointer'}}
              >
                <img width="30%" height="30%" src={valoracion} />
                <Typography sx={{textAlign:'center', lineHeight:1}}>Valoración de terrenos</Typography>
              </Box>
              <Box
                bgcolor="primary.main"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width={140}
                gap={1}
                height={90}
                borderRadius={2}
                onClick = {()=>route('/anotherData/2')}
                sx={{cursor:'pointer'}}
              >
                <img width="30%" height="30%" src={potencial} />
                <Typography sx={{textAlign:'center', lineHeight:1}}> Potencial de diversificación</Typography>
               
              </Box>
            </Grid>

            <Grid display="flex" gap={2}>
              <Box
                bgcolor="primary.main"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap={1}
                width={140}
                height={90}
                borderRadius={2}
                onClick = {()=>route('/anotherData/3')}
              >
                <img width="30%" height="30%" src={perspective} />
                <Typography sx={{textAlign:'center', lineHeight:1}}>Perspectivas de inversión</Typography>
              </Box>
              <Box
                bgcolor="primary.main"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                gap={1}
                alignItems="center"
                width={140}
                height={90}
                onClick = {()=>route('/anotherData/4')}
                borderRadius={2}
              >
                <img width="30%" height="30%" src={requisito} />
                <Typography sx={{textAlign:'center', lineHeight:1}}>Requisitos de cultivo</Typography>
                
              </Box>
            </Grid>
          </Grid>
          <Box
            paddingY={3}
            marginLeft='80%'
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
            <WhatsAppIcon sx={{ color: "primary.main", width:35, height:35 }} />
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
}

export default AnotherDatas;


