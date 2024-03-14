import Box from "@mui/material/Box";
import React from "react";
import FriendList from "../components/FriendList";
import NavBar from "../components/NavBar";

/**
 * Contains the following components:
 * - FriendList
 */
function FriendListView() {
    return (
        <>
            <NavBar centerText="Your friends" />
            <Box
                sx={{
                    textAlign: "center",
                    height: { xs: "none", md: "80%" },
                    width: "100vw",
                    pt: 3,
                }}
            >
                <FriendList />
            </Box>
        </>
    );
}

export default FriendListView;
