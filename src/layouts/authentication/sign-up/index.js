// Importing necessary React and Firebase functionalities
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import bgImage from 'assets/images/greybg.jpg'; // Background image

// Importing components from react-router-dom for navigation
import { Link } from 'react-router-dom';

// Importing Material UI components for UI design
import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import MuiLink from '@mui/material/Link';

// Importing icons from Material UI
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

// Importing custom Material Dashboard components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';

// Importing layout component for authentication pages
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import { auth, db } from '../../../Firebase.js'; // Importing Firebase authentication and Firestore
import { createUserWithEmailAndPassword } from 'firebase/auth';  // Firebase method for creating a new user
import { setDoc, doc } from 'firebase/firestore'; // Firebase Firestore methods for setting document

import { useMaterialUIController } from 'context'; // Custom hook for accessing Material UI Controller context

// Main functional component for the Sign-Up page
function Basic() {
  // Setting up state variables for username, email, password, and remember me functionality
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation
  const [controller] = useMaterialUIController(); // Destructure the controller object from context
  const { darkMode } = controller; // Extract darkMode state from the controller

  // Function to handle user sign-up
  const SignUp = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    createUserWithEmailAndPassword(auth, email, password) // Firebase method to create a new user with email and password
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(userCredential); // Log user credentials on successful sign-up

        // Store user details in Firestore
        await setDoc(doc(db, 'Users', user.uid), {
          uid: user.uid,
          name: username,
          email: user.email,
        });

        navigate('/dashboard'); // Navigate to the dashboard page upon successful sign-up
      })
      .catch((error) => {
        console.log(error); // Log any errors encountered during sign-up
      });
  };

  // Function to toggle the remember me state
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  // Rendering the sign-up form layout
  return (
    <BasicLayout image={bgImage}>
      <Card
        sx={{
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        {/* Header section with title */}
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

        {/* Form section for input fields and buttons */}
        <MDBox pt={4} pb={3} px={3} bgColor={darkMode ? 'dark' : 'white'} variant="gradient">
          <MDBox component="form" role="form">
            {/* Username input field */}
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Username"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                InputProps={{
                  style: { color: 'dark' }, // Input text color based on theme
                }}
              />
            </MDBox>
            {/* Email input field */}
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                InputProps={{
                  style: { color: 'dark' }, // Input text color based on theme
                }}
              />
            </MDBox>
            {/* Password input field */}
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                InputProps={{
                  style: { color: 'dark' }, // Input text color based on theme
                }}
              />
            </MDBox>
            {/* Remember me switch */}
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
            {/* Sign up button */}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={SignUp}>
                sign up
              </MDButton>
            </MDBox>
            {/* Link to sign-in page for existing users */}
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
    </BasicLayout>
  );
}

export default Basic;
