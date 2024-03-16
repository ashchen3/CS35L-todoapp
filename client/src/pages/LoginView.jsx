import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

/**
 * Contains the following components:
 * - LoginForm
 */
function LoginView() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                height: "100vh",
                minWidth: "50vw",
            }}
        >
            <Box>
                <img
                    src="logo.png"
                    alt="Logo"
                    style={{ maxWidth: "17%", height: "auto", marginBottom: "10px" }}
                />

                <Typography variant="h4" sx={{ py: 2 }}>
                    Log In
                </Typography>
                <LoginForm />
                <Typography variant="subtitle2" sx={{ pt: 2 }}>
                    <Link to="/signup">Create account</Link>
                </Typography>
            </Box>
        </Box>
    );
}

export default LoginView;
