import AccountCircle from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

import useAuth from "../services/AuthContext";

/**
 * Renders a profile icon; when clicked, displays a drop-down menu
 * showing the user's username and a logout button.
 */
function ProfileIcon() {
    const [anchorEl, setAnchorEl] = useState(null);
    const { username, logout } = useAuth();

    /** Sets the anchor element to the profile icon once it's clicked. */
    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    /** Removes the anchor element once the profile icon is clicked again. */
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ marginLeft: "auto" , px: 1 }}>
            <Tooltip title="Your Account">
                <IconButton onClick={handleOpen}>
                    <Avatar alt="" src="" />
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                open={anchorEl !== null}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
            >
                <MenuItem>
                    <AccountCircle sx={{ mr: 1 }} />
                    <Typography variant="h6">{username}</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <Logout />
                    <Button onClick={logout}>Logout</Button>
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default ProfileIcon;
