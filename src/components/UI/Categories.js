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
                let womens = [{ womenCate: [], toggle: false }]
                let mens = [{ menCate: [], toggle: false }]
                for (let i = 0; i < data.length; i++) {
                    if (data[i].includes('womens-')) {
                        womens[0].womenCate.push(data[i])
                    } else if (data[i].includes('mens-')) {
                        mens[0].menCate.push(data[i])
                    } else {
                        allCate.push(data[i])
                    }
                }
                allCate.push(womens, mens)
                setAllCategories(allCate)
            })
    }, [])

    const dropdownToggle = (idx) => {
        let newValue = [...allCategories]
        newValue[idx][0].toggle = !newValue[idx][0].toggle
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
            {allCategories && allCategories.map((item, idx) => {
                return (
                    !Array.isArray(item) ?
                        <ListItemButton key={idx} onClick={() => props.changeCate(item)}>
                            <ListItemText primary={item.toUpperCase()} />
                        </ListItemButton> :
                        <Fragment>
                            {Object.getOwnPropertyNames(item[0])[0] === 'womenCate' ?
                                <Fragment>
                                    <ListItemButton onClick={() => dropdownToggle(idx)}>
                                        <ListItemText primary="WOMENS" />
                                        {item[0].toggle ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={item[0].toggle} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {item[0].womenCate.map((item2, idx2) => {
                                                return (
                                                    <ListItemButton sx={{ pl: 4 }} key={'women' + idx2} onClick={() => props.changeCate(item2)}>
                                                        <ListItemText primary={item2.replace('womens-', '').toUpperCase()} />
                                                    </ListItemButton>
                                                )
                                            })}
                                        </List>
                                    </Collapse>
                                </Fragment> :
                                <Fragment>
                                    <ListItemButton onClick={() => dropdownToggle(idx)}>
                                        <ListItemText primary="MENS" />
                                        {item[0].toggle ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={item[0].toggle} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {item[0].menCate.map((item3, idx3) => {
                                                return (
                                                    <ListItemButton sx={{ pl: 4 }} key={'men' + idx3} onClick={() => props.changeCate(item3)}>
                                                        <ListItemText primary={item3.replace('mens-', '').toUpperCase()} />
                                                    </ListItemButton>
                                                )
                                            })}
                                        </List>
                                    </Collapse>
                                </Fragment>
                            }
                        </Fragment>
                )
            })}
        </List>
    );
};

export default Categories;