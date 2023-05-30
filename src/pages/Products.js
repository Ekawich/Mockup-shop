import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store/cart';

import AllProduct from '../components/Product/AllProduct'
import Paginate from '../components/UI/Paginate';
import Categories from '../components/UI/Categories';
import Breadcrumb from '../components/UI/Breadcrumb';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { searchActions } from '../store/search';

const Products = () => {
    const dispatch = useDispatch()
    const search = useSelector(state => state.search.value)

    const [allProduct, setAllProduct] = useState(null)
    const [countTotalProducts, setCountTotalProducts] = useState(1)
    const [skip, setSkip] = useState(0) // pages
    const [productByCate, setProductByCate] = useState("")
    const [breadcrumb, setBreadcrumb] = useState("")

    useEffect(() => {
        getProducts()
    }, [skip, productByCate, search])

    const getProducts = async () => {
        let main = "https://dummyjson.com/products"
        let searchValue = "/search?q=" + search
        let limitPage = "limit=12&skip=" + skip
        let url = ""
        if (search) {
            url = main + searchValue + "&" + limitPage
            setProductByCate("")
            setBreadcrumb("")
        } else {
            url = main + productByCate + "?" + limitPage
        }
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
        const data = await response.json()
        // console.log(data)
        setAllProduct(data.products)
        setCountTotalProducts(data.total)
    }

    const skipDataChange = (value) => {
        setSkip(value)
    }

    const selectCategories = (value) => {
        dispatch(searchActions.searchValue(""))
        if (value === "all") {
            setProductByCate("")
            setBreadcrumb("")
            setSkip(0)
        } else {
            let newCate = "/category/" + value
            setProductByCate(newCate)
            setBreadcrumb(newCate)
            setSkip(0)
        }
    }

    const addToCart = (item) => {
        // console.log(item)
        dispatch(cartActions.addItems(item))
    }

    return (
        <div>
            <Grid container spacing={2} columns={16}>
                <Grid item md={3} sm={0}>
                    <Categories changeCate={selectCategories} />
                </Grid>
                {allProduct != "" && <Grid item md={13} sm={16}>
                    <Grid container sx={{ mb: 2 }}>
                        <Grid item>
                            <Breadcrumb breadcrumb={breadcrumb} />
                        </Grid>
                    </Grid>
                    <AllProduct products={allProduct} onClick={addToCart} />
                    <Grid container sx={{ mt: 2 }}>
                        <Grid item>
                            <Box>
                                <Paginate alignItem="end" countData={countTotalProducts} changePage={skipDataChange} />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>}
            </Grid>
        </div>
    );
};

export default Products;