import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";
import SignupForm from "../components/SignupForm";

/**
 * Contains the following components:
 * - SignupForm
 */
function SignupView() {
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
                <Typography variant="h4" sx={{ py: 2 }}>
                    Sign Up
                </Typography>
                <SignupForm />
                <Typography variant="subtitle2" sx={{ pt: 2 }}>
                    <Link to="/login">Back to log in</Link>
                </Typography>
            </Box>
        </Box>
    );
}

export default SignupView;
