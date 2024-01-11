import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import React, { useEffect, useState } from 'react'

import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import FromContainer from '../components/FromContainer'
import CustomLink from '../components/Link'

import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice'
import { useLoginMutation } from '../slices/usersApiSlice'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()
  const { userInfo } = useSelector((state) => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...response }))
      navigate(redirect)
    } catch (error) {
      toast.error(error?.data?.message || error?.error || 'Something went wrong!')
    }
  }
  return (
    <FromContainer>
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='name'
            label='Name'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete='name'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='email'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <CustomLink to='/forgotpassword' variant='body2'>
                Forgot password?
              </CustomLink>
            </Grid>
            <Grid item>
              <CustomLink to='/login' variant='body2'>
                {'You have an account? Sign In'}
              </CustomLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </FromContainer>
  )
}

export default RegisterScreen
