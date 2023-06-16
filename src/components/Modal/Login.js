import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import { auth, provider } from '../../services/GoogleLogin'
import { signInWithPopup, signOut } from 'firebase/auth';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import ClearIcon from '@mui/icons-material/Clear';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Login = () => {
    const dispatch = useDispatch()
    const toggleModal = useSelector(state => state.auth.toggleLogin
    )

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlerClose = () => {
        dispatch(authActions.showModal())
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
    }

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider).then((data) => {
            // console.log(data)
            const userData = {
                name: data._tokenResponse.firstName,
                photo: data._tokenResponse.photoUrl
            }
            localStorage.setItem('isLogin', true)
            localStorage.setItem('userData', JSON.stringify(userData))
            dispatch(authActions.setUser(userData))
        })
    }

    return (
        <div>
            <Modal
                open={toggleModal}
                onClose={handlerClose}
            >
                <Box sx={style} display='flex' flexDirection='column' alignItems='center' position='relative'>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handlerSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container sx={{ mb: 2 }}>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Stack direction='row' justifyContent='end'>
                            <IconButton aria-label="delete" size="medium" sx={{ mr: 1 }} onClick={handleGoogleLogin}>
                                <GoogleIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton aria-label="delete" size="medium">
                                <FacebookIcon fontSize="inherit" />
                            </IconButton>
                        </Stack>
                    </Box>
                    <IconButton aria-label="delete" sx={{ top: 0, right: 0, position: "absolute" }} onClick={handlerClose}>
                        <ClearIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Modal>
        </div >
    );
};

export default Login;