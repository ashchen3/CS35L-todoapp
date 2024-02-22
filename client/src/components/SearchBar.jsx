import TextField from '@mui/material/TextField';
import React from "react";

function SearchBar({ setSearchQuery }) {
    return (
        <TextField
            label={"Search your lists..."}
            margin="normal"
            fullWidth={true}
            onInput={(e) => {
                console.log(e.target.value);
                // setSearchQuery(e.target.value);
            }}
            onSubmit={(e) => e.preventDefault}
        />
    );
}

export default SearchBar;
