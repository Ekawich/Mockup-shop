import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

const NavBars = () => {

    return (
        <Box sx={{ flexGrow: 1, mb: 2 }}>
            <AppBar position="static" >
                <Container>
                    <Toolbar>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} href="/">
                            MOCKUP-SHOP
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box >
    );
};

export default NavBars;