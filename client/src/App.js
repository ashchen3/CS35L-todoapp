import { Box } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
// import Navbar from "./components/Navbar";
import CalendarView from "./pages/CalendarView";
// import FriendListView from "./pages/FriendListView";
import HomeView from "./pages/HomeView";
import ListView from "./pages/ListView";
import LoginView from "./pages/LoginView";
import SignupView from "./pages/SignupView";
import AnonymousRoute from "./routes/AnonymousRoute";
// import FriendRoute from "./routes/FriendRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./services/AuthContext";

const theme = createTheme({
    typography: {
        fontFamily: [`"Open Sans", "Roboto", "Helvetica", "Arial", sans-serif`],
    },
    palette: {
        background: {
            default: deepPurple[50],
        },
        primary: {
            main: deepPurple[500],
        },
        secondary: {
            main: deepPurple[50],
        },
        dark: {
            main: deepPurple[900],
        },
        alt: {
            main: deepPurple["A400"],
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ m: 0, p: 0, height: "100vh" }}>
                {/* <Navbar /> */}
                <BrowserRouter>
                    <AuthProvider>
                        <Routes>
                            {/* Only non-logged in users can access login page */}
                            <Route element={<AnonymousRoute />}>
                                <Route path="/login" element={<LoginView />} />
                                <Route path="/signup" element={<SignupView />} />
                            </Route>
                            {/* Only logged in users can access other routes */}
                            <Route element={<ProtectedRoute />}>
                                <Route path="/" state={{ userId: 0 }} element={<HomeView />} />
                                <Route path="/list" element={<ListView />} />
                                <Route path="/calendar" element={<CalendarView />} />
                                {/* <Route path="/friends" element={<FriendListView />} /> */}
                            </Route>
                            {/* <Route element={<FriendRoute />}> */}
                                {/* <Route path="/:friendId" element={<HomeView viewOnly={true} />} /> */}
                            {/* </Route> */}

                            {/* Default route
                            <Route path="*" element={<Navigate to="/" replace />} /> */}
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </Box>
        </ThemeProvider>
    );
}

export default App;
