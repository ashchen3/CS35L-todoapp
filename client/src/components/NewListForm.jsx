import ChecklistIcon from '@mui/icons-material/Checklist';
import { Backdrop, Box, Button, TextField } from "@mui/material";
import React from "react";

function NewListForm({ props }) {
    return (
        <Box sx={{ mt: 1, mb: 3 }} id="new-list-form">
            <form onSubmit={props.onSubmit}>
                <TextField
                    type="text"
                    label="List Name"
                    size="small"
                    value={props.category}
                    onChange={props.onChange}
                    sx={{ mb: 1 }}
                    fullWidth
                    required
                />
                <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<ChecklistIcon/>}
                >
                    Add list
                </Button>
            </form>
        </Box>
    );
}

export default NewListForm;
