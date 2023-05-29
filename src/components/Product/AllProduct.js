import React, { Fragment } from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from '../UI/ProductCard'

const AllProduct = (props) => {
    if (!props.products) {
        return <div>Loading...</div>
    }

    return (
        <Grid container spacing={2}>
            {props.products.map((item, idx) => {
                return (
                    <Grid item md={3} sm={4} xs={6} key={item.id}>
                        <ProductCard title={item.title} desc={item.description} thumbnail={item.thumbnail} />
                    </Grid>
                )
            })}
        </Grid>
    );
};

export default AllProduct;