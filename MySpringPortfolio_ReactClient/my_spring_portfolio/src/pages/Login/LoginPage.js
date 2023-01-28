import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { AuthContext } from '../../context/AuthContext';


export function LoginPage() {
//   const { login } = useAuth(); // this is not created yet, but will be in the next step
  const { setIsAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  const login = () => {
    // this is not created yet, but will be in the next step
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await axios.post(`${apiUrl}/auth/login`, {
            email: email,
            password: hashedPassword
        });
        console.log("this is the response:", response);
        //if successful, call the login function and set isAuthenticated to true
        login();
        setIsAuthenticated(true);
    } catch (error) {
        //if unsuccessful, show an error message
        console.log(error);
        alert('Invalid email or password, Please try again.');
    }
  }




  return (
    // <ThemeProvider theme={theme}>
    //   <Container component="main" maxWidth="xs">
    //     <CssBaseline />
    //     <Box
    //       sx={{
    //         marginTop: 8,
    //         display: 'flex',
    //         flexDirection: 'column',
    //         alignItems: 'center',
    //       }}
    //     >
    //       {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
    //         <LockOutlinedIcon />
    //       </Avatar> */}
    //       <Typography component="h1" variant="h5">
    //         Sign in
    //       </Typography>
    //       <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
    //         <TextField
    //           margin="normal"
    //           required
    //           fullWidth
    //           id="email"
    //           label="Email Address"
    //           name="email"
    //           autoComplete="email"
    //           autoFocus
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //         <TextField
    //           margin="normal"
    //           required
    //           fullWidth
    //           name="password"
    //           label="Password"
    //           type="password"
    //           id="password"
    //           autoComplete="current-password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //         <Button
    //           type="submit"
    //           fullWidth
    //           variant="contained"
    //           sx={{ mt: 3, mb: 2 }}
    //         >
    //           Sign In
    //         </Button>
    //         <Link to="/register" variant="body2" className="btn btn-secondary w-100">
    //           Don't have an account? Sign Up
    //         </Link>
    //       </Box>
    //     </Box>
    //   </Container>
    // </ThemeProvider>
     <div className="container">
      <h1>Login</h1>
      <form className="form-group" onSubmit={handleSubmit}>
        <label className="form-label">
          Email:
          <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="form-label">
          Password:
          <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className="btn btn-primary" type="submit">Login</button>
        <Link className="btn btn-secondary" to="/demo">Demo Portfolio</Link>
      </form>
    </div>
  );

};
