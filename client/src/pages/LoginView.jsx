import Box from "@mui/material/Box";
import React from "react";
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
                height: "100vh",
            }}
        >
            <LoginForm />
        </Box>
    );
}

export default LoginView;
