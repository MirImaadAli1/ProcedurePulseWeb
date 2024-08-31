import React, { useState } from 'react';
import { useNavigate, Link, Route } from 'react-router-dom';
// import bgImage from 'assets/images/greybg.jpg';
import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import { auth } from '../../../Firebase.js';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useMaterialUIController } from 'context';
import AuthSuccess from '../authSuccess.js';
import AuthFailure from '../authFailure.js';
import svgImage from '../../../assets/images/blob-scene-haikei.svg';
import zIndex from '@mui/material/styles/zIndex.js';
// import bgImage from '../../../assets/images/greybg2.jpg';
// import Cover from 'layouts/authentication/reset-password/cover';

function Basic() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [failureModalOpen, setFailureModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const SignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setSuccessModalOpen(true);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
        setFailureModalOpen(true);
      });
  };

  
  const handleResetPassword = () => {
    navigate('/reset-password');
  };

  return (
    <BasicLayout image={svgImage}>
      <Card
        sx={{
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <MDBox
          variant="gradient"
          bgColor={darkMode ? 'dark' : 'white'}
          borderRadius="lg"
          coloredShadow="dark"
          p={1}
          pt={2}
          mb={1}
          textAlign="center"
          sx={{
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
            marginBottom: '0px',
            overflow: 'hidden',
          }}
        >
          <MDTypography variant="h4" fontWeight="medium" color="dark" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3} bgColor={darkMode ? 'dark' : 'white'} variant="gradient">
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                InputProps={{
                  style: { color: 'dark' },
                }}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                InputProps={{
                  style: { color: 'dark' },
                }}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={0.5} pt={1} pb={-1}>
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="dark"
                onClick={handleResetPassword}
                sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
              >
                &nbsp;&nbsp;Reset Password
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={SignIn}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="dark" fontWeight="regular">
                Don&apos;t have an account?{' '}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <AuthSuccess 
        open={successModalOpen} 
        onClose={() => setSuccessModalOpen(false)} 
        redirectPath="/dashboard" 
      />
      <AuthFailure 
        open={failureModalOpen} 
        onClose={() => setFailureModalOpen(false)} 
        errorMessage={errorMessage} 
      />
    </BasicLayout>
  );
}

export default Basic;
