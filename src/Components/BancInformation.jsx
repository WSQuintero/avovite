import { Box, Button, Grid, Typography } from '@mui/material'
import logoInformacion from '../assets/img/informacion/logoInformacion.svg'
import logoInfo from '../assets/img/MenuDesktop/info.svg'
import truck from '../assets/img/MenuDesktop/Group 55.svg'
import mannual from '../assets/img/MenuDesktop/mannual.svg'
import idea from '../assets/img/MenuDesktop/idea.svg'
import pasar from "../assets/img/wallet/PasarG.svg";
import comprar from "../assets/img/wallet/ComprarG.svg";
import transactions from "../assets/img/wallet/TransactionG.svg";
import asesor from "../assets/img/wallet/AsesorG.svg";
import {
  
  LightbulbOutlined as LightbulbOutlinedIcon,
 
} from "@mui/icons-material";

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFinalContext } from '../Context/FinalContext'


function WalletInformation() {
  const Navigate = useNavigate()
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
        sx={(theme)=>({
          display:'none',
          [theme.breakpoints.up('lg')]:{
            display:'flex',
            
            flexWrap:"wrap",
            width:'60vw',
            height:'50vh',
            marginRight:50,
            gap:6
           
          }
        })}
        >
         
              <Box
                bgcolor="primary.main"
                component={Button}
                variant='contained'
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width={258}
                height={176}
                borderRadius={2}
                onClick={() => Navigate("/passmoney")}
                sx={{ cursor: "pointer" }}
              >
                <Grid marginRight={15} marginTop={1} >
                
                <Box
                 bgcolor="white"
                 width={52}
                 height={48}
                 borderRadius={1}
                 display='flex'
                 justifyContent='center'
                 alignItems='center'
                >
                <img width="60%" height="60%" src={pasar} />

                </Box>
                <Box height={10}></Box>
                <Typography color='white' sx={{textTransform:'none'}}>Pasar Dinero</Typography>
                </Grid>
                <img width="20%" height="20%" src={logoInformacion} style={{marginRight:-191, marginTop:-5}}/>

              </Box>
              <Box
               bgcolor="primary.main"
               component={Button}
               variant='contained'
               display="flex"
               flexDirection="column"
               justifyContent="center"
               alignItems="center"
               width={258}
               height={176}
               borderRadius={2}
               onClick={() => handleTransaction()}
               sx={{ cursor: "pointer" }}
              >
                 <Grid marginRight={14} marginTop={1} >

                <Box
                 bgcolor="white"
                 width={52}
                 height={48}
                 borderRadius={1}
                 display='flex'
                 justifyContent='center'
                 alignItems='center'
                >

                 <img width="60%" height="60%" src={transactions} />
                </Box>
                <Box height={10}></Box>
                <Typography color='white'  sx={{textTransform:'none'}}>Transacciones</Typography>
                 </Grid>
                <img width="20%" height="20%" src={logoInformacion} style={{marginRight:-191, marginTop:-5}}/>

              </Box>
           

          
              <Box
              component={Button}
              variant='contained'
                bgcolor="primary.main"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width={258}
                height={176}
                borderRadius={2}
                onClick={() => route("/anotherDatas")}
                sx={{ cursor: "pointer" }}
              >
                <Grid marginRight={14} marginTop={1} >
                
                <Box
                 bgcolor="white"
                 width={52}
                 height={48}
                 borderRadius={1}
                 display='flex'
                 justifyContent='center'
                 alignItems='center'>


                <img width="60%" height="60%" src={comprar} />  
                {/* <LightbulbOutlinedIcon sx={{ width: 40, height: 40 }} /> */}
                 </Box>
                <Box height={10}></Box>
                <Typography color='white' sx={{textTransform:'none'}}>Comprar Vites</Typography>
                </Grid>
                <img width="20%" height="20%" src={logoInformacion} style={{marginRight:-191, marginTop:-5}}/>
              </Box>
              <Box
               component={Button}
               variant='contained'
                bgcolor="primary.main"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width={258}
                height={176}
                borderRadius={2}
                onClick={() => handleAsesorComponent()}
                sx={{ cursor: "pointer" }}
              >
                 <Grid marginRight={10} marginTop={1} >
                 <Box
                 bgcolor="white"
                 width={54}
                 height={48}
                 borderRadius={1}
                 display='flex'
                 justifyContent='center'
                 alignItems='center'
                >
                <img idth="60%" height="60%" src={asesor} />
                </Box>
                <Box height={10}></Box>
                <Typography color='white'sx={{textTransform:'none'}}>Hablar con Asesor</Typography>
                </Grid>

                <img width="20%" height="20%" src={logoInformacion} style={{marginRight:-191, marginTop:-5}}/>
              
              </Box>
           
        </Box>
  )
}

export default WalletInformation

BancInformation