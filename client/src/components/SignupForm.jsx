import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../services/AuthContext";

function SignupForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState();
    const navigate = useNavigate();

    /** Handles when a user submits the login form. */
    const handleLogin = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            setConfirmPassword("");
            return;
        }
        axios
            .post("http://localhost:3000/signup", {
                username: username,
                pwd: password,
            })
            .then((res) => {
                navigate("/login");
                alert("Created account successfully. Please log in again.");
            })
            .catch((err) => {
                setError("Username taken");
                setUsername("");
            });
        setPassword(""); // clear password field when user login fails
        setConfirmPassword("");
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
                fullWidth
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />
            <TextField
                label="Confirm password"
                variant="outlined"
                type="password"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
            />
            <Button type="submit" variant="contained">
                Sign Up
            </Button>
            {error && (
                <Typography variant="subtitle2" fontWeight="bold" color="red">
                    {error}
                </Typography>
            )}
        </Box>
    );
}

export default SignupForm;
