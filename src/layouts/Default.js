import React, { Fragment } from 'react';
import NavBars from '../components/UI/NavBars';
import Container from '@mui/material/Container';
import Cart from '../components/Cart/Cart';
import Login from '../components/Modal/Login';

const Default = (props) => {
    return (
        <Fragment>
            <NavBars />
            <Container maxWidth="xl" sx={{ py: 3 }}>
                <main>
                    {props.children}
                </main>
                <Cart />
                <Login />
            </Container>
        </Fragment>
    );
};

export default Default;