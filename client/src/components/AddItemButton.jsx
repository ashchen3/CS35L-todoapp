import AddIcon from "@mui/icons-material/Add";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Fab } from "@mui/material";
import React, { Fragment } from "react";

function AddItemButton({ onClick, buttonText, isClicked }) {
    return (
        <Fab
            variant="extended"
            size="small"
            color="primary"
            onClick={onClick}
            sx={{ textTransform: "none", my: 1 }}
            aria-label="add"
        >
            {isClicked ? (
                <Fragment>
                    <AddIcon /> {buttonText}
                </Fragment>
            ) : (
                <Fragment>
                    <ArrowDropUpIcon /> Close
                </Fragment>
            )}
        </Fab>
    );
}

export default AddItemButton;
