import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import React, { useEffect, useState } from "react";
import categoriesData from "../data/categories.json"; // TEMP

import AddItemButton from "../components/AddItemButton";
import CategoryCard from "../components/CategoryCard";
import NewListForm from "../components/NewListForm";
import ProfileIcon from "../components/ProfileIcon";
import SearchBar from "../components/SearchBar";

/**
 * Contains the following components:
 * - SearchBar
 * - ProfileIcone
 * - AddItemButton ("Create new list")
 * - NewListForm (rendered if above button is clicked)
 * - CategoryCard (display list of categories)
 */
function HomeView() {
    const [categories, setCategories] = useState([]);
    const [displayNewListForm, setDisplayNewListForm] = useState(false);

    // Fetch and update categories
    useEffect(() => {
        setCategories(categoriesData);
        // axios.get("categoriesEndpoint")
        //     .then((res) => res.data.json())
        //     .then((data) => setCategories(data))
        //     .catch(err => console.error(err));
    }, []);
    // }, [categories]);
    // TODO: here we will set `categories` as a dependency once backend API
    // is set up, so that the latest data is retrieved once `categories`
    // is updated. For now, set empty list and let client display changes.

    /**
     * Resets the input form with default values (empty).
     */
    const resetForm = () => ({ category: "" });
    const [newListFormData, setNewListFormData] = useState(resetForm);

    /**
     * Updates the state when user types in input, so that the React state
     * is the sole source of truth.
     */
    const handleInputChange = (e) => {
        setNewListFormData({ category: e.target.value });
    };

    /**
     * Handles when the "create new list" form is submitted.
     * Does the following:
     * - Updates React's `category` state (TODO: POST to server)
     * - Reset form (and prevent default behavior)
     */
    const handleFormSubmit = (e) => {
        setCategories([...categories, newListFormData.category]);
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
        <Box sx={{ px: 5, py: 1, bgcolor: 'primary.background'}} id="home">
            {/* Search bar and profile icon */}
            <Box sx={{ display: "flex" }}>
                <SearchBar />
                <ProfileIcon />
            </Box>

            {/* Create new list button and form to add list, if clicked */}
            <AddItemButton
                onClick={handleFormDisplay}
                isClicked={!displayNewListForm}
                buttonText="Create New List"
            />
            {displayNewListForm && (
                <NewListForm
                    props={{
                        category: newListFormData.category,
                        onChange: handleInputChange,
                        onSubmit: handleFormSubmit,
                    }}
                />
            )}

            {/* List each of the categories added */}
            <Grid
                container
                rowSpacing={{ xs: 1, sm: 2 }}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ my: 1 }}
                id="home-list"
            >
                {/* TODO: give unique key */}
                {categories.map((category, index) => (
                    <Grid xs={10} sm={6} md={4}>
                        <CategoryCard
                            props={{ category: category }}
                            key={index}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default HomeView;
