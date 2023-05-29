import React, { Fragment } from 'react';
import NavBars from '../components/UI/NavBars';
import Container from '@mui/material/Container';

const Default = (props) => {
    return (
        <Fragment>
            <NavBars />
            <Container>
                <main>
                    {props.children}
                </main>
            </Container>
        </Fragment>
    );
};

export default Default;