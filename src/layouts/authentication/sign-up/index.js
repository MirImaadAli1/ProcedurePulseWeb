import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import bgImage from 'assets/images/greybg.jpg';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import { auth, db } from '../../../Firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useMaterialUIController } from 'context';
import AuthSuccess from '../authSuccess.js';
import AuthFailure from '../authFailure.js';


function Basic() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [failureModalOpen, setFailureModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const SignUp = async (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        setDoc(doc(db, "Users", user.uid), {
          uid: user.uid,
          name: username,
          email: user.email,
        })

        // Show success modal
        setSuccessModalOpen(true);

      })
      .catch((error) => {
        // Handle sign-up errors
        setErrorMessage(`Error creating user: ${error.message}`);
        setFailureModalOpen(true);
        console.log(error.message);
      });
  };


  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
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
          mt={-1}
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
          }}
        >
          <MDTypography variant="h4" fontWeight="medium" color="dark" mt={1}>
            Sign up
          </MDTypography>
        </MDBox>

        <MDBox pt={4} pb={3} px={3} bgColor={darkMode ? 'dark' : 'white'} variant="gradient">
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Username"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                InputProps={{
                  style: { color: 'dark' },
                }}
              />
            </MDBox>
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
            <MDBox display="flex" alignItems="center" ml={-1} pt={1} pb={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="dark"
                onClick={handleSetRememberMe}
                sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={SignUp}>
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="dark" fontWeight="regular">
                Already have an account?{' '}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign in
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>

      {/* Modals */}
      <AuthSuccess open={successModalOpen} onClose={() => setSuccessModalOpen(false)} redirectPath="/authentication/sign-in" />
      <AuthFailure open={failureModalOpen} onClose={() => setFailureModalOpen(false)} errorMessage={errorMessage} />
    </BasicLayout>
  );
}

export default Basic;
