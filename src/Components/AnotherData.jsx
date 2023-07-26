import { Box, Button, Grid, Typography } from "@mui/material";
import logoInformacion from "../assets/img/informacion/logoInformacion.svg";
import logoInfo from "../assets/img/MenuDesktop/info.svg";
import truck from "../assets/img/MenuDesktop/Group 55.svg";
import mannual from "../assets/img/MenuDesktop/mannual.svg";
import idea from "../assets/img/MenuDesktop/idea.svg";
import valoracion from "../assets/img/anotherdata/valoracionG.svg";
import potencial from "../assets/img/anotherdata/potencialG.svg";
import perspectiva from "../assets/img/anotherdata/perspectiveG.svg";
import requisitos from "../assets/img/anotherdata/requisitoG.svg";
import { LightbulbOutlined as LightbulbOutlinedIcon } from "@mui/icons-material";

import React from "react";
import { useFinalContext } from "../Context/FinalContext";
import { useNavigate } from "react-router-dom";

function AnotherData() {
  const Navigate = useNavigate();
  const { transaction, setTransaction, asesorComponent, setAsesorComponent } =
    useFinalContext();
  const handleTransaction = () => {
    setTransaction(true);
  };
  const handleAsesorComponent = () => {
    setAsesorComponent(true);
  };
  return (
    <Box
      sx={(theme) => ({
        display: "none",
        [theme.breakpoints.up("lg")]: {
          display: "flex",
          alignItems:'center',
          justifyContent:'initial',
          flexWrap: "wrap",
          width: "80vw",
          height: "50vh",
          gap: 6,
        },
      })}
    >
        <Grid display='flex' flexDirection='column' alignItems='center' justifyContent='center' gap={1}>

      <Box
        bgcolor="primary.main"
        component={Button}
        variant="contained"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width={258}
        height={176}
        gap={1}
        borderRadius={2}
        onClick = {()=>Navigate('/anotherData/1')}
        sx={{ cursor: "pointer" }}
      >
        
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="white"
            paddingY={0.6}
            width={54}
            borderRadius={1}
           marginTop={6}
            marginRight={20}
          >
            <img height="60%" width='80%'  src={valoracion} />
          </Box>
        
          <Grid 
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width='100%'
          gap={1}>
          <Typography color="white"  sx={{ textTransform: "none", fontSize:19,fontWeight: 600, width:'100%', marginLeft:0.1,textAlign:'initial' }}>
            Valoracion de terrenos
          </Typography>
        <img
         width="50%" 
         height="50%" 
         style={{marginRight:-20}}
          src={logoInformacion}
         
        />
        </Grid>
      </Box>
      <Typography sx={(theme)=>({
        [theme.breakpoints.up('lg')]:{
            textAlign:'center',
            width:"80%"
        }
      })}>Nuestro negocio cuenta con expertos en la<br/>valoración de terrenos de aguacates. </Typography>
        </Grid>
        <Grid display='flex' flexDirection='column' alignItems='center' justifyContent='center' gap={1}>

      <Box
        bgcolor="primary.main"
        component={Button}
        variant="contained"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width={258}
        height={176}
        gap={1}
        borderRadius={2}
        onClick = {()=>Navigate('/anotherData/2')}
        sx={{ cursor: "pointer" }}
      >
       
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="white"
            width={54}
            
            
            borderRadius={1}
           marginTop={6}
            marginRight={20}    
          >
            <img height="60%" width='80%' src={potencial} />
          </Box>
          <Box height={10}></Box>
          <Grid
           display="flex"
           justifyContent="space-between"
           alignItems="center"
           width='100%'
           gap={1}
          >
          <Typography color="white"  sx={{ textTransform: "none", fontSize:19,fontWeight: 600, width:'100%', marginLeft:0.1,textAlign:'initial' }}>
            Pontecial de diversificación{" "}
          </Typography>
        <img
         width="50%" 
         height="50%" 
         style={{marginRight:-20}}
          src={logoInformacion}
        />
        </Grid>
      </Box>
      <Typography sx={(theme)=>({
        [theme.breakpoints.up('lg')]:{
            textAlign:'center',
            width:"80%"
        }
      })}> La compra de terrenos de<br/>aguacatespuede ofrecer la<br/>oportunidad de diversificar las fuentes </Typography>
      </Grid>
      <Grid display='flex' flexDirection='column' alignItems='center' justifyContent='center' gap={1}>
      <Box
        component={Button}
        variant="contained"
        bgcolor="primary.main"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width={258}
        height={176}
        gap={1}
       
        borderRadius={2}
        onClick = {()=>Navigate('/anotherData/3')}
        sx={{ cursor: "pointer" }}
      >
        <Box
           display="flex"
           justifyContent="center"
           alignItems="center"
           bgcolor="white"
           width={54}
           height={70}
           paddingY={0.6}
           borderRadius={1}
          marginTop={6}
           marginRight={20}
        >
          <img height="70%" width='80%' src={perspectiva} />
          
        </Box>
          
        <Grid 
        display="flex"
          justifyContent="space-between"
          alignItems="center"
          width='100%'
          gap={1}
         >

          <Typography color="white"  sx={{ textTransform: "none", fontSize:19,fontWeight: 600, width:'100%', marginLeft:0.1,textAlign:'initial' }}>
            Perpectivas de inversión
          </Typography>
          
        <img
          width="50%" 
          height="50%" 
          style={{marginRight:-20}}
          src={logoInformacion}
          
        />
        </Grid>
      </Box>
      <Typography sx={(theme)=>({
        [theme.breakpoints.up('lg')]:{
            textAlign:'center',
            width:"80%"
        }
      })}>Si estás considerando vender tu<br/>terreno de aguacates, puedes aprovechar<br/>la oportunidad </Typography>
      </Grid>
      <Grid display='flex' flexDirection='column' alignItems='center' justifyContent='center' gap={1} marginLeft={3}>
      <Box
        component={Button}
        variant="contained"
        bgcolor="primary.main"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width={258}
        height={176}
        borderRadius={2}
        onClick = {()=>Navigate('/anotherData/4')}
        sx={{ cursor: "pointer" }}
      >
        <Box
          bgcolor="white"
          width={54}
          height={48}
          paddingY={0.6}
          borderRadius={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={4}
          marginRight={20}
        >
          <img height="70%" width='80%' src={requisitos} />
        </Box>
        <Box height={10}></Box>
        <Grid
           display="flex"
           justifyContent="space-between"
           alignItems="center"
           width='100%'
           gap={1}
        >
          <Typography
            
            color="white"  sx={{ textTransform: "none", fontSize:19,fontWeight: 600, width:'100%', marginLeft:0.1,textAlign:'initial' }}
          >
            Requisitos de cultivo
          </Typography>
          <img width="50%" 
         height="50%" 
         style={{marginRight:-20}}
          src={logoInformacion} />
        </Grid>
      </Box>
      <Typography sx={(theme)=>({
        [theme.breakpoints.up('lg')]:{
            textAlign:'center',
            width:"80%"
        }
      })}>El aguacate requiere ciertas<br/>condiciones climáticas y del<br/>suelo </Typography>
      </Grid>
    </Box>
  );
}

export default AnotherData;
