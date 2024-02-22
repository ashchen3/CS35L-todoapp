import "./App.css";
import logo from "./logo.svg";
import HomeView from "./pages/HomeView";
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
            <HomeView />
        </ThemeProvider>
    );
}

export default App;
