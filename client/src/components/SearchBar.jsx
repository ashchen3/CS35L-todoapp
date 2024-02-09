import { TextField } from "@mui/material";
import React from "react";

function SearchBar({ setSearchQuery }) {
    return (
        <TextField
            placeholder="Search for a task..."
            size="small"
            fullWidth="true"
            onInput={(e) => {
                console.log(e.target.value);
                // setSearchQuery(e.target.value);
            }}
            onSubmit={(e) => e.preventDefault}
            sx={{ py: 3 }}
        />
    );
}

export default SearchBar;
