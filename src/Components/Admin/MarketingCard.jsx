import { useState } from 'react';
import { Box, Typography, IconButton, Menu, MenuItem, Drawer, List, Button } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Divider from '@mui/material/Divider';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SendIcon from '@mui/icons-material/Send';

const getBackgroundColor = (source) => {
    switch (source) {
        case 'facebook':
            return '#1877F2';
        case 'whatsapp':
            return '#25D366'; 
        case 'web':
            return '#FFA500'; 
        case 'excel':
            return '#008000'; 
        default:
            return 'green'; 
    }
};

const DetailsBox = ({ title, details }) => (
    <Box display='column' sx={{ marginTop: '30px' }}>
        <Typography sx={{ fontSize: '16px', fontWeight: '600', color: 'black' }}>{title}</Typography>
        {details.map((detail, index) => (
            <Box key={index} display='flex' sx={{ justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '14px', color: 'black', marginTop: '15px' }}>{detail.label}</Typography>
                <Typography sx={{ fontSize: '14px', color: 'black', marginTop: '15px' }}>{detail.value}</Typography>
            </Box>
        ))}
        <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
    </Box>
);

const MarketingCard = ({ image, completeName, email, source, date, phoneNumber, lastAppointment, status, link }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = () => {
        handleClose(); 
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleThreeDotsClick = (event) => {
        event.stopPropagation();
        handleMenuClick(event);
    };

    return (
        <Box
            sx={{
                backgroundColor: '#f0f0f0',
                borderRadius: '15px',
                padding: '10px',
                width: '100%',
                boxSizing: 'border-box',
                marginTop: '5px',
                fontWeight: '500',
                marginBottom: '20px',
                fontSize: '14px'
            }}
        >
            <Box display='flex'>
                <img src={image}
                    alt="ProfileImage"
                    style={{ width: '50px', height: '50px', borderRadius: '50px', margin: '5px' }} />
                <Box display='column'>
                    <Box display='flex' sx={{ justifyContent: 'space-between', alignItems: 'center', maxHeight: '20px' }}>
                        <Typography sx={{ fontSize: '13.5px', fontWeight: '600' }}>{completeName}</Typography>
                        <IconButton onClick={handleThreeDotsClick}>
                            <MoreHorizIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <MenuItem onClick={toggleDrawer}>Ver</MenuItem>
                            <MenuItem onClick={handleClose}>Eliminar</MenuItem>
                        </Menu>
                    </Box>
                    <Typography sx={{ fontSize: '12px', fontWeight: '300' }}>{email}</Typography>
                    <Typography sx={{ fontSize: '9px', fontWeight: '300' }}>{phoneNumber}</Typography>
                </Box>
            </Box>
            <Box display='flex' sx={{ justifyContent: 'space-between', alignItems: 'end', marginTop: '2px' }}>
                <Box display= 'inline-flex' sx={{background: getBackgroundColor(source), color: 'white', fontWeight: '300', paddingLeft: '12.5px', paddingRight: '12.5px', paddingTop: '2.5px', paddingBottom: '2.5px', borderRadius: '6px', fontSize: '12px', marginLeft: '5px'}}>{source}</Box>
                <Typography sx={{ fontSize: '10px', fontWeight: '300', color: 'grey' }}>Created: {date}</Typography>
            </Box>
            <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
                <List>
                    <Box sx={{width:'450px', padding: '25px'}}>
                        <Box sx={{width: '190px', height: '190px', borderRadius: '100px', margin: '5px', backgroundColor: 'white', boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.2)'}}>
                            <img src="https://t1.ea.ltmcdn.com/es/posts/6/6/7/la_alimentacion_de_los_canguros_20766_orig.jpg"
                                alt="profile"
                                style={{ width: '185px', height: '185px', borderRadius: '100px', margin: '5px' }} />
                        </Box>
                        <Box display='column' sx={{marginTop: '35px'}}>
                            <Typography sx={{ fontWeight: '800', fontSize: '24px', color: 'black' }}>{completeName}</Typography>
                            <Box display= 'inline-flex' sx={{background: getBackgroundColor(source), color: 'white', fontWeight: '500', paddingLeft: '20px', marginTop: '20px', paddingRight: '20px', paddingTop: '5px', paddingBottom: '5px', borderRadius: '10px', fontSize: '14px'}}>{source}</Box>
                        </Box>
                        <DetailsBox title="Client Details" details={[
                            { label: 'Email', value: email },
                            { label: 'Account created', value: date },
                            { label: 'Source', value: source, color: getBackgroundColor(source) }
                        ]} />

                        <DetailsBox title="Appointments Details" details={[
                            { label: 'Last Appointment', value: lastAppointment },
                            { label: 'Status', value: status },
                            { label: 'Link', value: link }
                        ]} />

                        <Box display='flex' sx={{ justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '55px' }}>
                            <Button variant="contained" color="primary" startIcon={<CalendarMonthIcon />}>Schedule Follow Up</Button>
                            <Button variant="contained" color="grey" sx={{ border: '1px solid black', color: 'black'}} startIcon={<SendIcon />}>Send Message</Button>
                        </Box>
                    </Box>
                </List>
            </Drawer>
        </Box>
    );
};

export default MarketingCard;
