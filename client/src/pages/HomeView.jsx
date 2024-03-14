import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import AddItemButton from "../components/AddItemButton";
import NavBar from "../components/NavBar";
import NewListForm from "../components/NewListForm";
import SearchBar from "../components/SearchBar";
import TaskListCard from "../components/TaskListCard";
import useAuth from "../services/AuthContext";

/**
 * Contains the following components:
 * - SearchBar
 * - ProfileIcon
 * - AddItemButton ("Create new list")
 * - NewListForm (rendered if above button is clicked)
 * - TaskListCard (display list of tasklists)
 */
function HomeView({ viewOnly = false }) {
    const location = useLocation();
    const friendUsername = location.pathname.split("/")[2]; // /friends/friendUsername

    const { token, logoutOnTokenExpiry } = useAuth();
    const [tasklists, setTasklists] = useState();
    const [displayNewListForm, setDisplayNewListForm] = useState(false);

    /** Callback to handle when a tasklist is added, namely update `tasklists` state. */
    const handleTasklistAdded = (tasklist) => {
        setTasklists((prevTasklists) => [...prevTasklists, tasklist]);
    };

    /** Callback to handle when a tasklist is removed by updating `tasklists` state. */
    const handleTasklistDeleted = (tasklistToRemove) => {
        setTasklists((prevTasklists) =>
            prevTasklists.filter((tasklist) => tasklist.id !== tasklistToRemove.id)
        );
    };

    // Fetch and update tasklists
    useEffect(() => {
        console.log("GET tasklists from /api/lists");
        axios
            .get("http://localhost:3000/api/lists", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                params: {
                    username: friendUsername,
                },
            })
            .then((res) => setTasklists(res.data))
            .catch((err) => {
                logoutOnTokenExpiry(err);
            });
    }, [friendUsername]);
    // `friendUsername` is a dependency so that tasklists will be fetched
    // when user navigates from friend to home page

    /**
     * Toggles the form display when user clicks on the
     * "Create new list" button, resetting the form every time.
     */
    const handleFormDisplay = () => {
        setDisplayNewListForm(!displayNewListForm);
    };

    return (
        <>
            <NavBar centerText={viewOnly ? `${friendUsername}'s Tasklists` : "Your Tasklists"} />

            <Box sx={{ px: 5, py: 1, bgcolor: "primary.background" }} id="home">
                {/* Search bar */}
                {!viewOnly && (
                    <Box sx={{ display: "flex" }}>
                        <SearchBar tasklistData={tasklists} />
                    </Box>
                )}

                {/* Create new list button and form to add list, if clicked */}
                {!viewOnly && (
                    <AddItemButton
                        onClick={handleFormDisplay}
                        isClicked={displayNewListForm}
                        buttonText="Create New List"
                    />
                )}
                {displayNewListForm && <NewListForm handleTasklistAdded={handleTasklistAdded} />}

                {tasklists?.length > 0 ? (
                    // List each of the tasklists added
                    <Grid
                        container
                        rowSpacing={{ xs: 1, sm: 2 }}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        sx={{ my: 1 }}
                        id="home-list"
                    >
                        {tasklists?.map((tasklist) => (
                            <Grid xs={11} sm={6} md={4} key={tasklist.id}>
                                <TaskListCard
                                    tasklist={tasklist}
                                    viewOnly={viewOnly}
                                    handleTasklistDeleted={handleTasklistDeleted}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography variant="h5" sx={{ pt: 3 }}>
                        {!viewOnly
                            ? "No tasklists added. Create a new tasklist now!"
                            : `${friendUsername} has no tasklists.`}
                    </Typography>
                )}
            </Box>
        </>
    );
}

export default HomeView;
