import { useState } from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

const MarketingProfileMenu = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
            <List>
                <ListItem button onClick={toggleDrawer}>
                    <ListItemText primary="Opción 1" />
                </ListItem>
                <ListItem button onClick={toggleDrawer}>
                    <ListItemText primary="Opción 2" />
                </ListItem>
                <ListItem button onClick={toggleDrawer}>
                    <ListItemText primary="Opción 3" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default MarketingProfileMenu;
