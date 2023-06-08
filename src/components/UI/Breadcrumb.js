import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const Breadcrumb = (props) => {
    if (!props.breadcrumb) {
        return (
            <Link underline="hover" color="inherit" href="/">
                Home
            </Link>
        )
    }

    let bread = props.breadcrumb.split('/')

    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
                Home
            </Link>
            {bread && <Typography color="text.primary">{bread[bread.length - 1]}</Typography>}
        </Breadcrumbs>
    );
};

export default Breadcrumb;