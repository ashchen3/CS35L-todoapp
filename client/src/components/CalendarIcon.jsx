import * as React from 'react';
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Link } from "react-router-dom";

function CalendarIcon () {
    return (
        <Box sx={{ m: "auto", px: 1 }}>
            <IconButton 
                component={Link}
                to="/calendar"
            >
                <DateRangeIcon/>
            </IconButton>
        </Box>
    );
}

export default CalendarIcon;
