import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
    user: null,
    token: null,
    login: () => {},
    logout: () => {},
});

const AuthProvider = ({ children }) => {
    // Get current session from local state if any
    const [user, setUser] = useState(localStorage.getItem("userId") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const navigate = useNavigate();

    const login = (data) => {
        // axios
        //     .post("http://localhost:3000/api/login", {
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: {},
        //     })
        //     .then((res) => console.log(res))
        //     .catch((err) => console.log(err));
        data = {
            userId: 1,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwOTg1OTE5NCwiZXhwIjoxNzA5ODYyNzk0fQ.vBrgZFTvk528ViIRR52eSU3G3z6uVlJCcoIseuo5ung",
        };
        if (data) {
            setUser(data.userId);
            setToken(data.token);

            localStorage.setItem("token", data.token);
            // console.log(`User logged in with userId: ${data.userId}`);
            navigate("/home");
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        navigate("/");
    };

    return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider };
export default useAuth;
