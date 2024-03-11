import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import React, { useEffect, useState } from "react";

import AddItemButton from "../components/AddItemButton";
import NewListForm from "../components/NewListForm";
import ProfileIcon from "../components/ProfileIcon";
import SearchBar from "../components/SearchBar";
import TaskListCard from "../components/TaskListCard";
import CalendarIcon from "../components/CalendarIcon";
import useAuth from "../services/AuthContext";

/**
 * Contains the following components:
 * - SearchBar
 * - ProfileIcon
 * - AddItemButton ("Create new list")
 * - NewListForm (rendered if above button is clicked)
 * - TaskListCard (display list of tasklists)
 */
function HomeView() {
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
            })
            .then((res) => setTasklists(res.data))
            .catch((err) => {
                logoutOnTokenExpiry(err);
            });
    }, []);

    /**
     * Toggles the form display when user clicks on the
     * "Create new list" button, resetting the form every time.
     */
    const handleFormDisplay = () => {
        setDisplayNewListForm(!displayNewListForm);
    };

    return (
        <Box sx={{ px: 5, py: 1, bgcolor: "primary.background" }} id="home">
            {/* Search bar and profile icon */}
            <Box sx={{ display: "flex" }}>
                <CalendarIcon />
                <SearchBar tasklistData={tasklists} />
                <ProfileIcon />
            </Box>

            {/* Create new list button and form to add list, if clicked */}
            <AddItemButton
                onClick={handleFormDisplay}
                isClicked={displayNewListForm}
                buttonText="Create New List"
            />
            {displayNewListForm && <NewListForm handleTasklistAdded={handleTasklistAdded} />}

            {/* List each of the tasklists added */}
            <Grid
                container
                rowSpacing={{ xs: 1, sm: 2 }}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ my: 1 }}
                id="home-list"
            >
                {tasklists?.map((tasklist) => (
                    <Grid xs={10} sm={6} md={4} key={tasklist.id}>
                        <TaskListCard
                            tasklist={tasklist}
                            handleTasklistDeleted={handleTasklistDeleted}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default HomeView;
