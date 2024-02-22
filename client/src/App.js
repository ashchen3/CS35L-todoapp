import "./App.css";
import logo from "./logo.svg";
import HomeView from "./pages/HomeView";
import LoginView from "./pages/LoginView";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';



const theme = createTheme({
  palette: {
    background: { 
        default: deepPurple[50] 
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
        <ThemeProvider theme={theme}>
             <Router>
              <Routes>
                <Route path="/" element={<LoginView />} />
                <Route path="/home" element={<HomeView />} />
              </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
