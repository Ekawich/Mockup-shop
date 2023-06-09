import React from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard'
import Skeleton from '@mui/material/Skeleton';

let mockupItem = 6

const AllProduct = (props) => {
    return (
        <Grid container spacing={2}>
            {props.products ? props.products.map((item, idx) => {
                return (
                    <Grid item md={3} sm={6} xs={12} key={item.id}>
                        <ProductCard
                            id={item.id}
                            title={item.title}
                            desc={item.description}
                            thumbnail={item.thumbnail}
                            brand={item.brand}
                            price={item.price}
                            discountPercentage={item.discountPercentage}
                            rate={item.rating}
                            onClick={props.onClick} />
                    </Grid>
                )
            }) :
                [...Array(mockupItem).keys()].map((item, idx) => {
                    return (
                        <Grid item md={3} sm={4} xs={6} key={idx}>
                            <Skeleton animation="wave" height={350} sx={{ transform: "none" }} />
                        </Grid>
                    )
                })
            }
        </Grid>
    );
};

export default AllProduct;