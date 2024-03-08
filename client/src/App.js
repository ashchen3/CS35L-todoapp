import { Box } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import logo from "./logo.svg";
import HomeView from "./pages/HomeView";
import ListView from "./pages/ListView";
import LoginView from "./pages/LoginView";
import useAuth, { AuthProvider } from "./services/AuthContext";

const theme = createTheme({
    palette: {
        background: {
            default: deepPurple[50],
        },
        primary: {
            main: deepPurple[300],
        },
        secondary: {
            main: deepPurple[300],
        },
    },
});

const ProtectedRoute = () => {
    const { token } = useAuth();
    if (token === null) {
        return <Navigate to="/login" replace />;
    }
    console.log("User is authenticated with token");
    return <Outlet />
};

function App() {
    return (
        <Box sx={{ m: 0, p: 0, height: "100vh" }}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <AuthProvider>
                        <Routes>
                            <Route path="*" element={<Navigate to="/" replace />} />
                            <Route path="/login" element={<LoginView />} />
                            <Route element={<ProtectedRoute />}>
                                <Route path="/" element={<HomeView />} />
                                <Route path="/list" element={<ListView />} />
                            </Route>
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </ThemeProvider>
        </Box>
    );
}

export default App;
