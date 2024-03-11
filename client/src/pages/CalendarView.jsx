import Box from '@mui/material/Box';
import * as React from 'react';
import FullCalendarDisplay from '../components/CalendarColumn';

function CalendarView() {
    return (
        <Box sx={{ px: 5, py: 3, bgcolor: "primary.background" }} id="calendar">
            <FullCalendarDisplay/>
        </Box>
    );
}

export default CalendarView;

