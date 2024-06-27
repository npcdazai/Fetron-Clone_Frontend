import { useEffect, useState } from 'react';

// import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import sideimage from "../../../public/assets/images/covers/sample.png";

// import  "./Style/login.css";
// ----------------------------------------------------------------------
export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const initialValues = {email : "", password : ""}

  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFromValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [isSubmit , setIsSubmit] = useState(false);
  const handleChange =(e)=>{
    const {name, value} = e.target;
    setFromValues({...formValues, [name] :value});
    console.log(formValues);
  }

useEffect(() => {
  console.log(formErrors);
  if (Object.keys(formErrors).length === 0 && isSubmit === true) {
    console.log(formValues)
  }
}, [formErrors]);


  const validate =(values) =>{
 const errors ={}
 
    if (!values.email) {
      errors.email = "Sorry, your email is Required !"
      console.log("Form submitted:", formValues);
    }  
    if (!/\S+@\S+\.\S+/.test(values.email)){
      errors.email = "Sorry, your email was incorrect. Please double-check your email"
    }

    if (!values.password) {
      errors.password = " Sorry, your Password is Required !"
    }
    if (values.password < 6){
      errors.password = "Password must be at least 6 characters long"
    }
    return errors;
  }
  
  const handleClick = (e) => {
    // router.push('/user');
    e.preventDefault();
    setIsSubmit(true)
    setFormErrors(validate(formValues));
  };




  const renderForm = (
    <>
      <Stack spacing={3}>
      {Object.keys(formErrors).length === 0 && isSubmit ? (<div style={{backgroundColor:"rgba(145, 158, 171, 0.24)" , textAlign:"center", borderRadius:"8px"}}> Signed In Succesfull </div>):(
        ""
      )
      }
        <TextField onChange={handleChange} variant="standard" name="email" label="Email address" value={formValues.email} />
        
        <TextField value={formValues.password}
          variant="standard"
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
         
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover"> 
          Forgot password?
        </Link>
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );
  return (
    <Stack
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}/>
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 , display:"flex",flexDirection:"row" }}>
      <Card sx={{
          backgroundImage: `url(${sideimage})`,
          backgroundSize: 'cover',
          height: '86%',
          width: '420px',
          borderRadius:"10px 0px 0px 10px",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
        }}/>
        <Card
          sx={{
            padding:"2rem 3rem",
            width: 1,
            height: '86%',
            maxWidth: 420,
            borderRadius:"0px 10px 10px 0px",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
          }}
        >
          
          <Typography variant="h4">Sign in to APML</Typography>
          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}> 
              Get started
            </Link>
          </Typography>
          {renderForm}

          <p style={{color:"red" , textAlign:"center"}}>{formErrors.email}{formErrors.password}</p> 

          <Divider sx={{ my: 1}}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>
          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
              <Typography sx={{marginLeft:"1rem"}}>Sign in with Google</Typography>
            </Button>
          </Stack>    
        </Card>
      </Stack>  
    </Stack>
  );
}
