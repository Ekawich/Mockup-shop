import React, { Fragment, useEffect, useState } from 'react';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const Categories = (props) => {
    const [allCategories, setAllCategories] = useState(null)

    useEffect(() => {
        fetch("https://dummyjson.com/products/categories")
            .then(response => response.json())
            .then(data => {
                let allCate = []
                let womens = { subCate: [], toggle: false }
                let mens = { subCate: [], toggle: false }
                for (let i = 0; i < data.length; i++) {
                    if (data[i].includes('womens-')) {
                        womens.subCate.push(data[i])
                    } else if (data[i].includes('mens-')) {
                        mens.subCate.push(data[i])
                    } else {
                        allCate.push(data[i])
                    }
                }
                allCate.push(womens, mens)
                // console.log(allCate)
                setAllCategories(allCate)
            })
    }, [])

    const dropdownToggle = (idx) => {
        let newValue = [...allCategories]
        newValue[idx].toggle = !newValue[idx].toggle
        setAllCategories(newValue)
    };

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Categories
                </ListSubheader>
            }
        >
            <ListItemButton onClick={() => props.changeCate("all")}>
                <ListItemText primary="ALL PRODUCTS" />
            </ListItemButton>
            {allCategories && allCategories.map((item, idx) => {
                return (
                    typeof item !== 'object' ?
                        <ListItemButton key={item + idx} onClick={() => props.changeCate(item)}>
                            <ListItemText primary={item.toUpperCase()} />
                        </ListItemButton> :
                        <Fragment key={item + idx}>
                            <ListItemButton onClick={() => dropdownToggle(idx)}>
                                <ListItemText primary={item.subCate[0].split('-')[0].toUpperCase()} />
                                {item.toggle ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={item.toggle} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {item.subCate.map((item2, idx2) => {
                                        return (
                                            <ListItemButton sx={{ pl: 4 }} key={item2 + idx2} onClick={() => props.changeCate(item2)}>
                                                <ListItemText primary={item2.split('-')[1].toUpperCase()} />
                                            </ListItemButton>
                                        )
                                    })}
                                </List>
                            </Collapse>
                        </Fragment>
                )
            })}
        </List>
    );
};

export default Categories;