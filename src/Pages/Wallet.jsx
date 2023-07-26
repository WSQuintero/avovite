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
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";

import BackgroundPhoto from "../assets/img/backgroundphoto.svg";
import logo from "../assets/img/logo.svg";
import { useTheme } from "@emotion/react";
import Header from "../Components/Header/Header";
import menuSidebar from "../assets/img/header menu copy.svg";
import imageProfile from "../assets/img/imageProfile.svg";
import photoDefault from "../assets/img/photoDefault.svg";
import background from "../assets/img/wallet/background.svg";
import pasar from "../assets/img/wallet/pasar.svg";
import comprar from "../assets/img/wallet/comprar.svg";
import transactions from "../assets/img/wallet/transactions.svg";
import asesor from "../assets/img/wallet/asesor.svg";
import { useFinalContext } from "../Context/FinalContext";
import TransactionList from "../Components/TransactionList";
import Asesor from "../Components/Asesor";
import WalletInformation from "../Components/WalletInformation";
function Wallet() {
  const theme = useTheme();
  const route = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const { transaction, setTransaction, asesorComponent, setAsesorComponent } =
    useFinalContext();
  const handleTransaction = () => {
    setTransaction(true);
  };
  const handleAsesorComponent = () => {
    setAsesorComponent(true);
  };

  return (
    <Grid display="flex" flexDirection="column">
      <Box
        position="relative"
        height="50vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box
          sx={(theme) => ({
            [theme.breakpoints.up("lg")]: {
              display: "none",
            },
          })}
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
        </Box>
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
          sx={(theme) => ({
            [theme.breakpoints.up("lg")]: {
              display: "none",
            },
          })}
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
          sx={(theme) => ({
            position: "absolute",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            bottom: 0,
            top: 0,
            gap: 8,
            [theme.breakpoints.up("lg")]: {
              marginTop: 10,
              flexDirection:'column',
              alignItems:'center',
              marginRight:20,
              width:'100%',
              gap:0,
            },
          })}
        >
          <Box
            position="absolute"
            width="100%"
            top={50}
            height={40}
            bgcolor="primary.main"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            sx={(theme) => ({
              [theme.breakpoints.up("lg")]: {
                display: "none",
              },
            })}
          >
            <Button
              onClick={() => route("/menu")}
              sx={{
                marginLeft: 1,
                color: "secondary.body",
                textTransform: "none",
              }}
              startIcon={
                <KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />
              }
            >
              Mis VITES
            </Button>
            <Button
              onClick={() => route("/checkout")}
              variant="contained"
              sx={{ height: "100%", bgcolor: "#498A19" }}
            >
              <ShoppingCartIcon sx={{ color: "secondary.body" }} />
            </Button>
          </Box>
        </Box>
      </Box>
          <Typography variant="h2" sx={(theme)=>({
            [theme.breakpoints.up('lg')]:{
              
              
            }
          })}>Billetera</Typography>
          <Box sx={(theme)=>({
            [theme.breakpoints.up('lg')]:{
              display:'flex',
              justifyContent:'flex-start',
              alignItems:'center',
              width:'100%',
              
            }
          })}>
          <Box
            sx={(theme) => ({
              [theme.breakpoints.up("lg")]: {
              
              },
            })}
          >
            <img
              src={photoDefault}
              alt="logos"
              style={{ width: "40%", height: "40%" }}
            />
          </Box>

          <Grid display="flex" flexDirection="column" sx={(theme)=>({
            [theme.breakpoints.up('lg')]:{
             marginLeft:-20,
            }
          })}>
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
          sx={(theme) => ({
            [theme.breakpoints.up("lg")]: {
              display: "none",
            },
          })}
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
              onClick={() => route("/passmoney")}
              sx={{ cursor: "pointer" }}
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
              onClick={() => handleTransaction()}
              sx={{ cursor: "pointer" }}
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
              onClick={() => route("/anotherDatas")}
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
              onClick={() => handleAsesorComponent()}
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
          marginLeft="80%"
          bgcolor="secondary.body"
          border={1}
          borderRadius="50%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width={50}
          height={50}
          sx={(theme)=>({
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          [theme.breakpoints.up('lg')]:{
            display:'none'
          }
          })}
        >
          <WhatsAppIcon sx={{ color: "primary.main", width: 35, height: 35 }} />
        </Box>
      </Grid>
        <WalletInformation/>

      {transaction && <TransactionList />}
      {asesorComponent && <Asesor />}
    </Grid>
  );
}

export default Wallet;
