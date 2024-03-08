import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

import useAuth from "../services/AuthContext";

function LoginButton() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();
    const { login } = useAuth();

    /** Handles when a user submits the login form. */
    const handleLogin = (e) => {
        e.preventDefault();
        login({ username, password, setError });
        setPassword(""); // clear password field when user login fails
    };

    return (
        <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 2, // Adds space between elements
            }}
        >
            <TextField
                label="Username"
                variant="outlined"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained">
                Login
            </Button>
            {error && <Typography variant="subtitle2">{error}</Typography>}
        </Box>
    );
}

export default LoginButton;
