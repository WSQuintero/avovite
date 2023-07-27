import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import Header from "./Header/Header";
import { paquages } from "../utilities/myCards";
import { useFinalContext } from "../Context/FinalContext";

function CargaCuenta() {
  const theme = useTheme();
  const route = useNavigate();
  const {setComponentCargaCuenta, setGananciaList}=useFinalContext()
  const [isNatural, setIsNatural] = useState(false);
  const [isJuridica, setIsJuridica] = useState(false);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === "natural") {
      setIsNatural(checked);
    } else if (name === "juridica") {
      setIsJuridica(checked);
    }
  };
  
  const handleCargaCuentaClose = ()=>{
    setComponentCargaCuenta(null)
    setGananciaList(true)
  }

  return (
    <Box
      position="absolute"
    
    
      display="flex"
      flexDirection="column"
      sx={(t)=>({
        bgcolor:'white',
        height:'100%',
        width:"100%",
        alignItems:'center',
        justifyContent:'center',
     
          [t.breakpoints.up('lg')]:{
            
             backgroundColor: "white",
          height:'400vh',
          marginTop:50,
         
          }
        })}
    >
      <Header />

      <Box
       
        paddingX={1}
        height={40}
        bgcolor="primary.main"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={(t)=>({
          width:"100%",
          
          [t.breakpoints.up('lg')]:{
          display:'none' 
          }
        })}
      >
        <Button
          onClick={() => handleCargaCuentaClose()}
          sx={{
            marginLeft: 1,
            color: "secondary.body",
            textTransform: "none",
          }}
          startIcon={<KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />}
        >
          Carga cuenta
        </Button>
        <Button
          onClick={() => route("/checkout")}
          variant="contained"
          sx={{ height: "80%", bgcolor: "#498A19" }}
        >
          <ShoppingCartIcon sx={{ color: "secondary.body" }} />
        </Button>
      </Box>

      {/* the filter of image */}

     
        <Grid
          paddingX={5}
          paddingY={7}
          display="flex"
          flexDirection="column"
          alignItems='center'
          justifyContent="center"
          gap={2}
          sx={(t)=>({
            paddingX:0,
            width:"80%",
            [t.breakpoints.up('lg')]:{
              width:'50%',
             border:1,
             borderColor:'primary.main',
             borderRadius:12,
             paddingX:10,
            }
          })}
        >
          <Typography color="text.cards" textAlign="center">
            Tu carga se hará a través de PSE y del portal de la entidad bancaria
            de tu preferencia
          </Typography>

          <Typography color="primary.main">Valor a Cargar</Typography>
          <TextField
            variant="outlined"
            placeholder="Ingresa el valor a cargar"
            sx={{width:'96%'}}
          />
            <Typography color='primary.main'>Tipo de Persona</Typography>
          <Grid display="flex">
            <Grid display="flex" alignItems="center">
              <Checkbox
                checked={isNatural}
                onChange={handleCheckboxChange}
                name="natural"
              />
              <Typography
                color={isNatural ? "primary.main" : "text.cards"}
              >
                Natural
              </Typography>
            </Grid>
            <Grid display="flex" alignItems="center">
              <Checkbox
                checked={isJuridica}
                onChange={handleCheckboxChange}
                name="juridica"
              />
              <Typography
                color={isJuridica ? "primary.main" : "text.cards"}
              >
                Juridica
              </Typography>
            </Grid>
          </Grid>

          <Typography color="primary.main">Banco</Typography>
          <TextField
            variant="outlined"
            placeholder="A continuación seleccione su banco"
            sx={{width:'96%'}}
          />

          <Button  variant="contained" onClick={()=>handleCargaCuentaClose()}sx={{color:'white', width:'80%'}}>Continuar</Button>
        </Grid>
     
    </Box>
  );
}

export default CargaCuenta;
