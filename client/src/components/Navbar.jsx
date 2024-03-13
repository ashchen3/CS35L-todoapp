import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";

import { Tooltip } from "@mui/material";
import CalendarIcon from "./CalendarIcon";
import ProfileIcon from "./ProfileIcon";

function NavBar({ centerText }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ width: "100%" }}>
                <Toolbar>
                    <Tooltip title="Home">
                        <IconButton
                            size="medium"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 2 }}
                            component={Link}
                            to="/"
                        >
                            <Typography variant="h5">remembrall</Typography>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Calendar">
                        <Box>
                            <CalendarIcon />
                        </Box>
                    </Tooltip>
                    <Box
                        sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}
                        style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}
                    >
                        <Typography variant="h5">{centerText}</Typography>
                    </Box>
                    <ProfileIcon />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;
