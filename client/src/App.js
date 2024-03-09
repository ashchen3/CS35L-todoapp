import { Box } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import CalendarView from "./pages/CalendarView";
import HomeView from "./pages/HomeView";
import ListView from "./pages/ListView";
import LoginView from "./pages/LoginView";
import AnonymousRoute from "./routes/AnonymousRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./services/AuthContext";

const theme = createTheme({
    palette: {
        background: {
            default: deepPurple[50],
        },
        primary: {
            main: deepPurple[500],
        },
        secondary: {
            main: deepPurple[300],
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ m: 0, p: 0, height: "100vh" }}>
                <BrowserRouter>
                    <AuthProvider>
                        <Routes>
                            {/* Default route */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                            {/* Only non-logged in users can access login page */}
                            <Route element={<AnonymousRoute />}>
                                <Route path="/login" element={<LoginView />} />
                            </Route>
                            {/* Only logged in users can access other routes */}
                            <Route element={<ProtectedRoute />}>
                                <Route path="/" element={<HomeView />} />
                                <Route path="/list" element={<ListView />} />
                                <Route path="/calendar" element={<CalendarView />} />
                            </Route>
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </Box>
        </ThemeProvider>
    );
}

export default App;
