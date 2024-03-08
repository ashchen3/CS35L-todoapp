import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
    username: null,
    token: null,
    login: () => {},
    logout: () => {},
});

const AuthProvider = ({ children }) => {
    // Get current session from local state if any
    const [username, setUsername] = useState(localStorage.getItem("username") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const navigate = useNavigate();

    /**
     * Login function.
     * Takes in the following props: username, password, setError.
     */
    const login = (props) => {
        axios
            .post("http://localhost:3000/login", {
                username: props.username,
                pwd: props.password,
            })
            .then((res) => {
                if (res.status !== 200) throw new Error();
                return res.data;
            })
            .then((data) => {
                if (data) {
                    setUsername(props.username);
                    setToken(data.token);
                    localStorage.setItem("username", props.username);
                    localStorage.setItem("token", data.token);
                    navigate("/home");
                }
            })
            .catch((err) => {
                if (err.response.status !== 200) {
                    props.setError("Invalid username or password.");
                } else {
                    props.setError("An unexpected error occurred. Please try again later.");
                }
            });
    };

    const logout = () => {
        setUsername(null);
        setToken(null);
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ username, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider };
export default useAuth;
