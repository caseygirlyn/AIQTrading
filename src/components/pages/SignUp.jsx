import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      // Display an error message
      console.error("Passwords do not match");
      return;
    }
    console.log('Form submitted:', formData);
  };

  return (
    <div data-testid="signup" style={{
      backgroundImage: 'url(assets/images/stock1.PNG)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <Container maxWidth="sm" style={{ backgroundColor: '#ffffffb5', color: '#fff', borderStyle:"solid", borderWidth: "2px", borderColor:"#282D3A" , paddingBottom:"30px"}}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom sx={{ marginTop: "50px", color:"#282D3A" }}>Sign Up</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" style={{ backgroundColor: '#282D3A', color: '#fff' }}>Sign Up</Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}

export default SignUp;

