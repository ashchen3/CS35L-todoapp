import Box from "@mui/material/Box";
import * as React from "react";
import FullCalendarDisplay from "../components/CalendarColumn";
import NavBar from "../components/NavBar";

function CalendarView() {
    return (
        <>
            <NavBar centerText="Calendar" />
            <Box sx={{ px: 3, py: 3, bgcolor: "primary.background" }} id="calendar">
                <FullCalendarDisplay />
            </Box>
        </>
    );
}

export default CalendarView;
