import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper, Link } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom'; // Hook untuk pengalihan

// Menggunakan elemen div untuk memastikan container mengisi seluruh layar
const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
  background: 'linear-gradient(to bottom, #ffffff, #d9ffd6)', // Gradasi 
  overflow: 'hidden',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  maxWidth: 300,
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const LoginPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Hook untuk pengalihan

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    // Logika login di sini
    console.log('Login - Email:', email);
    console.log('Login - Password:', password);
    navigate('/dashboard'); // Pengalihan ke halaman dasbor
  };

  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    // Logika pendaftaran di sini
    console.log('Sign Up - Email:', email);
    console.log('Sign Up - Password:', password);
    console.log('Sign Up - Confirm Password:', confirmPassword);
    navigate('/dashboard'); // Pengalihan ke halaman dasbor
  };

  return (
    <StyledContainer>
      <StyledPaper>
        <Title variant="h5" align="center">
          {showSignUp ? 'Sign Up' : 'Login'}
        </Title>
        {showSignUp ? (
          <form onSubmit={handleSubmitSignUp}>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Box>
            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Sign Up
            </StyledButton>
            <Box mt={2} textAlign="center">
              <Link href="#" onClick={() => setShowSignUp(false)}>
                Already have an account? Login here
              </Link>
            </Box>
          </form>
        ) : (
          <>
            <form onSubmit={handleSubmitLogin}>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Box>
              <StyledButton
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </StyledButton>
              <Box mt={2} textAlign="center">
                <Typography>
                  <Box component="span" sx={{ mr: 1 }}>
                    Don't have an account?
                  </Box>
                  <Link href="#" onClick={() => setShowSignUp(true)}>
                    Sign up here
                  </Link>
                </Typography>
              </Box>
              <Box mt={1} textAlign="center">
                <Link href="#">
                  Forgot Password?
                </Link>
              </Box>
            </form>
          </>
        )}
      </StyledPaper>
    </StyledContainer>
  );
};

export default LoginPage;
