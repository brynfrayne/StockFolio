import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import bcrypt from 'bcryptjs';

export function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { setToken, setIsAuthenticated } = useContext(AuthContext);
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const hashedPassword = await bcrypt.hash(password, 10);
        setPassword(hashedPassword);
        try {
            const response = await axios.post(`${apiUrl}/auth/register`,{
                    "email": email,
                    "firstName": firstName,
                    "lastName": lastName,
                    "phoneNumber": phoneNumber,
                    "password": password

            });
            console.log("this is the response:", response);
            setIsAuthenticated(true);
            setToken(response.data.token);
            return <Navigate to="/login" />

        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="container">
            <h1>Registration</h1>
            <form className="form-group d-flex row">
                <div className="d-flex flex-wrap flex-column col-6">
                    <label className="form-label">
                        Email:
                        <input className="form-control" type="email" onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label className="form-label">
                        Password:
                        <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <label className="form-label">
                        Confirm Password:
                        <input className={confirmPassword === password ? "form-control" : "form-control is-invalid"} type="password"  onChange={(e) => setConfirmPassword(e.target.value)} />
                    </label>
                </div>
                <div className="d-flex flex-wrap flex-column col-6">
                    <label className="form-label">
                        First Name:
                        <input className="form-control" type="text" onChange={(e) => setFirstName(e.target.value)} />
                    </label>
                    <label className="form-label">
                        Last Name:
                        <input className="form-control" type="text" onChange={(e) => setLastName(e.target.value)} />
                    </label>
                    <label className="form-label">
                        Phone Number:
                        <input className="form-control" type="text" onChange={(e) => setPhoneNumber(e.target.value)} />
                    </label>
                </div>
            </form>
            <button className="btn btn-primary m-3" type="submit" onClick={handleSubmit}>Register</button>
            <Link to="/login" className="btn btn-secondary m-3">Already have an account? Sign in</Link>
        </div>
    );
}





//     <ThemeProvider theme={theme}>
    //         <Container component="main" maxWidth="xs">
    //             <CssBaseline />
    //             <Box
    //                 sx={{
    //                     marginTop: 8,
    //                     display: 'flex',
    //                     flexDirection: 'column',
    //                     alignItems: 'center',
    //                 }}
    //             >
    //                 <Typography component="h1" variant="h5">
    //                     Sign up
    //                 </Typography>
    //                 <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
    //                     <Grid container spacing={2}>
    //                         <Grid item xs={12} sm={6}>
    //                             <TextField
    //                                 margin="normal"
    //                                 required
    //                                 fullWidth
    //                                 id="email"
    //                                 label="Email Address"
    //                                 name="email"
    //                                 autoComplete="email"
    //                                 autoFocus
    //                                 value={email}
    //                                 onChange={(e) => setEmail(e.target.value)}
    //                             />
    //                             <TextField
    //                                 margin="normal"
    //                                 required
    //                                 fullWidth
    //                                 name="password"
    //                                 label="Password"
    //                                 type="password"
    //                                 id="password"
    //                                 autoComplete="current-password"
    //                                 value={password}
    //                                 onChange={(e) => setPassword(e.target.value)}
    //                             />
    //                             <TextField
    //                                 margin="normal"
    //                                 required
    //                                 fullWidth
    //                                 name="confirmPassword"
    //                                 label="Confirm Password"
    //                                 type="password"
    //                                 id="confirmPassword"
    //                                 autoComplete="current-password"
    //                                 value={temp}
    //                                 // onChange={(e) => {if (e.target.value === password) setConfirmPassword(e.target.value)}}
    //                                 className={temp === password ? "is-valid" : "is-invalid"}
    //                             />
    //                         </Grid>
    //                         <Grid item xs={12} sm={6}>
    //                             <TextField
    //                                 margin="normal"
    //                                 required
    //                                 fullWidth
    //                                 name="firstName"
    //                                 label="First Name"
    //                                 type="firstName"
    //                                 id="firstName"
    //                                 autoComplete="current-firstName"
    //                                 value={firstName}
    //                                 onChange={(e) => setFirstName(e.target.value)}
    //                             />
    //                             <TextField
    //                                 margin="normal"
    //                                 required
    //                                 fullWidth
    //                                 name="lastName"
    //                                 label="Last Name"
    //                                 type="lastName"
    //                                 id="lastName"
    //                                 autoComplete="current-lastName"
    //                                 value={lastName}
    //                                 onChange={(e) => setLastName(e.target.value)}
    //                             />
    //                             <TextField
    //                                 margin="normal"
    //                                 required
    //                                 fullWidth
    //                                 name="phone"
    //                                 label="Phone"
    //                                 type="phone"
    //                                 id="phone"
    //                                 autoComplete="current-phone"
    //                                 value={phoneNumber}
    //                                 onChange={(e) => setPhoneNumber(e.target.value)}
    //                             />
    //                         </Grid>
    //                     </Grid>
    //                     <Button
    //                             type="submit"
    //                             // fullWidth
    //                             className="btn btn-primary w-100"
    //                             variant="contained"
    //                             sx={{ mt: 3, mb: 2 }}
    //                         >
    //                             Sign Up
    //                     </Button>
    //                     <Link to="/login" variant="body2" className="btn btn-secondary w-100">
    //                         Already have an account? Sign in
    //                     </Link>
    //                 </Box>
    //             </Box>
    //         </Container>
    //     </ThemeProvider>
    // );
// }
