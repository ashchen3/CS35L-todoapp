import { Box } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import logo from "./logo.svg";
import HomeView from "./pages/HomeView";
import ListView from "./pages/ListView";
import LoginView from "./pages/LoginView";

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

function App() {
    return (
        <Box sx={{ m: 0, p: 0, height: "100vh" }}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path="/" element={<LoginView />} />
                        <Route path="/home" element={<HomeView />} />
                        <Route path="/list" element={<ListView />} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </Box>
    );
}

export default App;
