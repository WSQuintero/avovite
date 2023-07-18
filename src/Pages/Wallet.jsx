import React, { useState, useEffect } from "react";
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
  KeyboardBackspace as KeyboardBackspaceIcon,
  MoreVert as MoreVertIcon,
  WhatsApp as WhatsAppIcon,

} from "@mui/icons-material";

import BackgroundPhoto from "../assets/img/backgroundphoto.svg";
import logo from "../assets/img/logo.svg";
import { useTheme } from "@emotion/react";
import Header from "../Components/Header/Header";
import menuSidebar from "../assets/img/header menu copy.svg";
import imageProfile from "../assets/img/imageProfile.svg";
import photoDefault from "../assets/img/photoDefault.svg";
import background from '../assets/img/wallet/background.svg'
import pasar from '../assets/img/wallet/pasar.svg'
import comprar from '../assets/img/wallet/comprar.svg'
import transactions from '../assets/img/wallet/transactions.svg'
import asesor from '../assets/img/wallet/asesor.svg'
import { useFinalContext } from "../Context/FinalContext";
import TransactionList from "../Components/TransactionList";
import Asesor from "../Components/Asesor";
function Wallet() {
  const theme = useTheme();
  const route= useNavigate()
  const [isClicked, setIsClicked] = useState(false);
  const {transaction,setTransaction, asesorComponent, setAsesorComponent} = useFinalContext()
  const handleTransaction = ()=>{
    setTransaction(true)
  }
  const handleAsesorComponent = ()=>{
    setAsesorComponent(true)
  }

  return (
    <Grid display="flex" flexDirection="column">
      <Box
        position="relative"
        height="50vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <img
          src={background}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
          alt="photo"
        />
        <Box
          position="absolute"
          left={0}
          top={0}
          width="100%"
          height={40}
          bgcolor="none"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            sx={{
              paddingLeft: 1,
              color: "secondary.body",
              textTransform: "none",
            }}
            startIcon={
              <img src={menuSidebar} width={20} height={20} alt="menuSidebar" />
            }
          />
          <Typography>Avovite App</Typography>

          <Button endIcon={<MoreVertIcon style={{ color: "white" }} />} />
        </Box>

        {/* the filter of image */}
        <Box
          display="flex"
          flexDirection="row"
          position="absolute"
          justifyContent="space-between"
          alignItems="center"
        marginRight={20}
          bottom={0}
          top={0}
          gap={8}
         
        >
           
            <img
              src={photoDefault}
              alt="logos"
              style={{ width:"80%", height:"80%" }}
            />
            
         
          <Grid display="flex" flexDirection="column"  >
            <Typography sx={{ color: "white", fontSize:15 }}>
            Tu Dinero
            </Typography>
            <Typography marginRight={10} width='100%' sx={{ color: "secondary.body", fontSize: 18, fontWeight:600 }}>
            $ 5.000.000
            </Typography>
            
          </Grid>

          
        </Box>

        <Grid
          paddingX={2}
          paddingY={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
        

          <Grid
            display="flex"
            paddingY={9}
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
                borderRadius={2}
                onClick = {()=>route('/passmoney')}

                sx={{cursor:'pointer'}}
              >
                <img width="30%" height="30%" src={pasar} />
                <Typography>Pasar dinero</Typography>
              </Box>
              <Box
                bgcolor="primary.main"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width={140}
                height={90}
                borderRadius={2}
                onClick={()=>handleTransaction()}
                sx={{cursor:'pointer'}}
              >
                <img width="30%" height="30%" src={transactions} />
                <Typography>Transacciones</Typography>
              </Box>
            </Grid>

            <Grid display="flex" gap={2}>
              <Box
                bgcolor="primary.main"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width={140}
                height={90}
                borderRadius={2}
                onClick={()=>route('/anotherDatas')}
              >
                 <img width="30%" height="30%" src={comprar} />
                
                <Typography>Comprar VITES</Typography>
              </Box>
              <Box
                bgcolor="primary.main"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                onClick={()=>handleAsesorComponent()}
                width={140}
                height={90}
                borderRadius={2}
              >
                <img width="30%" height="30%" src={asesor} />
                <Typography>Hablar con asesor</Typography>
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
      {
        transaction && (
          <TransactionList/>
        )
      }
      {
        asesorComponent && (
          <Asesor/>
        )
      }
    </Grid>
  );
}

export default Wallet;
