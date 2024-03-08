import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import AddItemButton from "../components/AddItemButton";
import NewListForm from "../components/NewListForm";
import ProfileIcon from "../components/ProfileIcon";
import SearchBar from "../components/SearchBar";
import TaskListCard from "../components/TaskListCard";
import useAuth from "../services/AuthContext";

/**
 * Contains the following components:
 * - SearchBar
 * - ProfileIcon
 * - AddItemButton ("Create new list")
 * - NewListForm (rendered if above button is clicked)
 * - TaskListCard (display list of tasks)
 */
function HomeView() {
    const { token, logout } = useAuth();
    const [tasklists, setTasklists] = useState();
    const [displayNewListForm, setDisplayNewListForm] = useState(false);

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
                if (err.response.status === 401) {
                    alert("You need to login again!");
                    logout();
                }
            });
    }, []);

    /**
     * Resets the input form with default values (empty).
     */
    const resetForm = () => ({ tasklist: "" });
    const [newListFormData, setNewListFormData] = useState(resetForm);

    /**
     * Updates the state when user types in input, so that the React state
     * is the sole source of truth.
     */
    const handleInputChange = (e) => {
        setNewListFormData({ tasklist: e.target.value });
    };

    /**
     * Handles when the "create new list" form is submitted.
     * Does the following:
     * - Updates React's `category` state (TODO: POST to server)
     * - Reset form (and prevent default behavior)
     */
    const handleFormSubmit = (e) => {
        setTasklists([...tasklists, newListFormData.tasklist]);
        e.preventDefault();
        setNewListFormData(resetForm);
    };

    /**
     * Toggles the form display when user clicks on the
     * "Create new list" button, resetting the form every time.
     */
    const handleFormDisplay = () => {
        setNewListFormData(resetForm);
        setDisplayNewListForm(!displayNewListForm);
    };

    return (
        <Box sx={{ px: 5, py: 1, bgcolor: "primary.background" }} id="home">
            {/* Search bar and profile icon */}
            <Box sx={{ display: "flex" }}>
                <SearchBar />
                <ProfileIcon />
            </Box>

            {/* Create new list button and form to add list, if clicked */}
            <AddItemButton
                onClick={handleFormDisplay}
                isClicked={displayNewListForm}
                buttonText="Create New List"
            />
            {displayNewListForm && (
                <NewListForm
                    props={{
                        tasklist: newListFormData.tasklist,
                        onChange: handleInputChange,
                        onSubmit: handleFormSubmit,
                    }}
                />
            )}

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
                        <TaskListCard tasklist={tasklist} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default HomeView;
