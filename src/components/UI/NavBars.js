import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';
import { authActions } from '../../store/auth';
import { auth } from '../../services/GoogleLogin';
import { signOut } from 'firebase/auth';


import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import { searchActions } from '../../store/search';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const NavBars = () => {
    const dispatch = useDispatch()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const cartItem = useSelector(state => state.cart.items);
    const isLogin = useSelector(state => state.auth.isLoggedIn)
    const user = useSelector(state => state.auth.user)
    const totalQuantity = cartItem.reduce((acc, item) => acc + item.quantity, 0)

    const settings = ['Logout'];


    const toggleCart = () => {
        dispatch(cartActions.toggleCart())
    }

    const searchProduct = (e) => {
        dispatch(searchActions.searchValue(e.target.value))
    }

    const showLogin = () => {
        dispatch(authActions.showModal())
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSignOut = () => {
        signOut(auth).then(() => {
            localStorage.setItem('isLogin', false)
            localStorage.removeItem('userData')
            dispatch(authActions.userLogout())
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar sx={{ p: 0 }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{
                            mr: 2,
                            display: { sm: 'block', md: 'none' }
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} href="/">
                        MOCKUP-SHOP
                    </Typography>
                    <Search sx={{ mr: 2 }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={searchProduct}
                        />
                    </Search>
                    <Stack spacing={2} direction="row" sx={{ mr: 2 }}>
                        <IconButton aria-label="ShoppingCart" size="large" onClick={toggleCart}>
                            <Badge badgeContent={totalQuantity} color="secondary">
                                <ShoppingCartIcon color="action" />
                            </Badge>
                        </IconButton>
                    </Stack>
                    {!isLogin ?
                        <Button color="inherit" onClick={showLogin}>Login</Button>
                        :
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={user.name && 'N'} src='https://lh3.googleusercontent.com/a/AAcHTteK7OeJaAEVCiuO94NgcM8WZDOjhd3Gd0ZKo5euhA=s96-c' />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleSignOut}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleSignOut}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBars;