import React, { Fragment } from 'react';
import NavBars from '../components/UI/NavBars';
import Container from '@mui/material/Container';
import Cart from '../components/Cart/Cart';

const Default = (props) => {
    return (
        <Fragment>
            <NavBars />
            <Container>
                <main>
                    {props.children}
                </main>
                <Cart />
            </Container>
        </Fragment>
    );
};

export default Default;