import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link as RouterLink, useParams } from "react-router-dom";
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
import { useFinalContext } from "../Context/FinalContext";
import Header from "../Components/Header/Header";
import logoInformacion from '../assets/img/informacion/logoInformacion.svg'
import { otherData } from "../utilities/myCards";

function OtherDataOptions() {
  const { id } = useParams();
//   console.log(id)
  const theme = useTheme();
  const route = useNavigate();
  const typographyRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // console.log(vites)

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

  const filterData = otherData.find((e) => e.id == id);
//   console.log(filterData)

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
            onClick={()=>route('/anotherDatas')}
            sx={{
              marginLeft: 1,
              color: "secondary.body",
              textTransform: "none",
            }}
            startIcon={
              <KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />
            }
          >
            Detalles
          </Button>
          <Button
          
            onClick={()=>route('/checkout')}
            variant="contained"
            sx={{ height: "80%", bgcolor: "#498A19" }}
          >
            <ShoppingCartIcon sx={{ color: "secondary.body" }} />
          </Button>
        </Box>

        {/* the filter of image */}

        <Grid
          paddingX={2}
          paddingY={10}
          display="flex"
          flexDirection="column"
          alignItems="center"
         
        >
          <Box
            bgcolor="primary.main"
            borderRadius="50%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: 60,
              height: 60,
            }}
          >
            <img src={logoInformacion} alt="logo" />
          </Box>

          <Typography
            sx={{ color: "primary.main", fontSize: 25, fontWeight: 500 }}
          >
            {filterData.title}
            
          </Typography>
          <Typography color="black"
                ref={typographyRef}
                textAlign='justify'
                lineHeight={2}
                sx={(t)=>({
                  maxHeight: "200px", // Ajusta la altura máxima deseada
                  overflowY: "scroll",
                  scrollbarWidth: "thin",
                  padding: "20px",
                
                  [t.breakpoints.up('lg')]:{
                     // Estilos de la barra de scroll
              
             
              maxHeight: 400, // Ajusta la altura máxima deseada
              overflowY: "scroll",
              scrollbarWidth: "thin",
              width:'60%',
              // Estilos específicos para scrollbar (Solo funcionan en navegadores que soportan los pseudo-elementos ::webkit-scrollbar)
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: theme.palette.primary.main,
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
                  }
                })}
                  
                  >
           {filterData.text}<br/><br/>
           {filterData.text}<br/><br/>
           {filterData.text}

          </Typography>
          

          <Box
            
            marginTop='60%'
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
    </Grid>
  );
}

export default OtherDataOptions;

