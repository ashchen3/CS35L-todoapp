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
                    <ArrowDropUpIcon /> Hide
                </Fragment>
            ) : (
                <Fragment>
                    <AddIcon /> {buttonText}
                </Fragment>
            )}
        </Fab>
    );
}

export default AddItemButton;
