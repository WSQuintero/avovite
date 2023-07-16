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
import book from "../assets/img/vites/book.svg";
import Annual from "../assets/img/vites/Annual.svg";
import idea from "../assets/img/vites/Idea.svg";
import truck from "../assets/img/vites/truck.svg";

function Vites() {
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
          bgcolor="#F3F3F3"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            sx={{
              marginLeft: 1,
              color: "primary.main",
              textTransform: "none",
            }}
            startIcon={<KeyboardBackspaceIcon sx={{ color: "primary.main" }} />}
          >
            Vites
          </Button>
          <Button variant="contained" sx={{ height: "100%" }}>
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
          <img src={viteplant} width="28%" height="28%" alt="photo" />

          <Typography variant="h2" bottom={10} color="text.disabled">
            Vites
          </Typography>

          <Typography variant="h2" color="primary.main">
            67
          </Typography>
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
                onClick = {()=>route('/informacion')}

                sx={{cursor:'pointer'}}
              >
                <img width="30%" height="30%" src={book} />
                <Typography>Información</Typography>
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
              >
                <img width="30%" height="30%" src={truck} />
                <Typography>Cosechas</Typography>
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
              >
                <LightbulbOutlinedIcon sx={{ width: 40, height: 40 }} />
                <Typography>Otros Datos</Typography>
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
              >
                <img width="30%" height="30%" src={Annual} />
                <Typography>Certificados</Typography>
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

export default Vites;
