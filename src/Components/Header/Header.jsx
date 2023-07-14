import React from 'react'
import {
    Box,
   
    Button,
    
    Typography,
   
  } from "@mui/material";
  import {
    Https as HttpsIcon,
    LockOutlined as LockOutlinedIcon,
    MailOutline as MailOutlineIcon,
    Person,
    KeyboardBackspace as KeyboardBackspaceIcon,
    MoreVert as MoreVertIcon,
  } from "@mui/icons-material";
  import menuSidebar from "../../assets/img/header menu copy.svg";

  

function Header() {


  return (
    <Box
          left={0}
          top={0}
          width="100%"
          height={40}
          bgcolor="#214820"
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
  )
}

export default Header