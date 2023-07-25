import { Box, Grid, Typography } from '@mui/material'
import logoInformacion from '../assets/img/informacion/logoInformacion.svg'
import logoInfo from '../assets/img/MenuDesktop/info.svg'
import truck from '../assets/img/MenuDesktop/Group 55.svg'
import mannual from '../assets/img/MenuDesktop/mannual.svg'
import idea from '../assets/img/MenuDesktop/idea.svg'

import {
  
  LightbulbOutlined as LightbulbOutlinedIcon,
 
} from "@mui/icons-material";

import React from 'react'
import { useNavigate } from 'react-router-dom'
function MenuVites() {
  const Navigate = useNavigate()
  return (
    <Box
        sx={(theme)=>({
          [theme.breakpoints.up('lg')]:{
            display:'flex',
            flexDirection:'column',
            gap:1
           
          }
        })}
        >
          <Grid display="flex" gap={1}>
              <Box
                bgcolor="primary.main"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width={258}
                height={176}
                borderRadius={2}
                onClick={() => Navigate("/informacion")}
                sx={{ cursor: "pointer" }}
              >
                <Grid marginRight={18} marginTop={1} >
                
                <Box
                 bgcolor="white"
                 width={52}
                 height={48}
                 borderRadius={1}
                 display='flex'
                 justifyContent='center'
                 alignItems='center'
                >
                <img width="60%" height="60%" src={logoInfo} />

                </Box>
                <Box height={10}></Box>
                <Typography>Información</Typography>
                </Grid>
                <img width="20%" height="20%" src={logoInformacion} style={{marginRight:-191, marginTop:-5}}/>

              </Box>
              <Box
               bgcolor="primary.main"
               display="flex"
               flexDirection="column"
               justifyContent="center"
               alignItems="center"
               width={258}
               height={176}
               borderRadius={2}
               onClick={() => Navigate("/informacion")}
               sx={{ cursor: "pointer" }}
              >
                 <Grid marginRight={18} marginTop={1} >

                <Box
                 bgcolor="white"
                 width={52}
                 height={48}
                 borderRadius={1}
                 display='flex'
                 justifyContent='center'
                 alignItems='center'
                >

                 <img width="60%" height="60%" src={truck} />
                </Box>
                <Box height={10}></Box>
                <Typography>Cosechas</Typography>
                 </Grid>
                <img width="20%" height="20%" src={logoInformacion} style={{marginRight:-191, marginTop:-5}}/>

              </Box>
            </Grid>

            <Grid display="flex" gap={1}>
              <Box
                bgcolor="primary.main"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width={258}
                height={176}
                borderRadius={2}
                onClick={() => Navigate("/informacion")}
                sx={{ cursor: "pointer" }}
              >
                <Grid marginRight={18} marginTop={1} >
                
                <Box
                 bgcolor="white"
                 width={52}
                 height={48}
                 borderRadius={1}
                 display='flex'
                 justifyContent='center'
                 alignItems='center'>


                <img width="60%" height="60%" src={idea} />  
                {/* <LightbulbOutlinedIcon sx={{ width: 40, height: 40 }} /> */}
                 </Box>
                <Box height={10}></Box>
                <Typography>Otros Datos</Typography>
                </Grid>
                <img width="20%" height="20%" src={logoInformacion} style={{marginRight:-191, marginTop:-5}}/>
              </Box>
              <Box
                bgcolor="primary.main"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width={258}
                height={176}
                borderRadius={2}
                onClick={() => Navigate("/informacion")}
                sx={{ cursor: "pointer" }}
              >
                 <Grid marginRight={18} marginTop={1} >
                 <Box
                 bgcolor="white"
                 width={52}
                 height={48}
                 borderRadius={1}
                 display='flex'
                 justifyContent='center'
                 alignItems='center'
                >
                <img idth="60%" height="60%" src={mannual} />
                </Box>
                <Box height={10}></Box>
                <Typography>Certificados</Typography>
                </Grid>

                <img width="20%" height="20%" src={logoInformacion} style={{marginRight:-191, marginTop:-5}}/>
              
              </Box>
            </Grid>
        </Box>
  )
}

export default MenuVites