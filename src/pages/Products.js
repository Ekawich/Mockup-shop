import React, { Fragment, useEffect, useState } from 'react';

import AllProduct from '../components/Product/AllProduct'
import Paginate from '../components/UI/Paginate';
import Categories from '../components/UI/Categories';
import Breadcrumb from '../components/UI/Breadcrumb';

import Grid from '@mui/material/Grid';

const Products = () => {
    const [allProduct, setAllProduct] = useState(null)
    const [countTotalProducts, setCountTotalProducts] = useState(1)
    const [skip, setSkip] = useState(0) // pages
    const [productByCate, setProductByCate] = useState("")
    const [breadcrumb, setBreadcrumb] = useState("")

    useEffect(() => {
        getProducts()
    }, [skip, productByCate])

    const getProducts = async () => {
        let main = "https://dummyjson.com/products"
        let limitPage = "?limit=12&skip=" + skip
        let url = main + productByCate + limitPage
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
        const data = await response.json()
        setAllProduct(data.products)
        setCountTotalProducts(data.total)
    }

    const skipDataChange = (value) => {
        setSkip(value)
    }

    const selectCategories = (value) => {
        let newCate = "/category/" + value
        setProductByCate(newCate)
        setBreadcrumb(newCate)
    }

    return (
        <div>
            <Grid container spacing={2} columns={16}>
                {allProduct &&
                    <Fragment>
                        <Grid item md={3} sm={0}>
                            <Categories changeCate={selectCategories} />
                        </Grid>
                        <Grid item md={13} sm={16}>
                            <Grid container sx={{ mb: 2 }}>
                                <Grid item>
                                    <Breadcrumb breadcrumb={breadcrumb} />
                                </Grid>
                            </Grid>
                            <AllProduct products={allProduct} />
                            <Grid container sx={{ mt: 2 }}>
                                <Grid item>
                                    <Paginate countData={countTotalProducts} changePage={skipDataChange} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Fragment>
                }
            </Grid>
        </div>
    );
};

export default Products;