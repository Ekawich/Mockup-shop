import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Paginate = (props) => {
    const [skipProduct, setSkipProduct] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    useEffect(() => {
        setTotalPages(Math.ceil(props.countData / 12))
    }, [props.countData])

    useEffect(() => {
        props.changePage(skipProduct)
    })

    const handlerChangePage = (value) => {
        if (value === 1) {
            setSkipProduct(0)
        } else {
            setSkipProduct(12 * value)
        }
    }

    return (
        <Stack spacing={2}>
            <Pagination count={totalPages} variant="outlined" shape="rounded" onChange={(e, value) => handlerChangePage(value)} />
        </Stack>
    );
};

export default Paginate;