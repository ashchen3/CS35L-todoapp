import * as React from 'react';
import { Box, Grid } from '@mui/material';

import CalendarTaskList from './CalendarTaskList';

function getDate(daysInTheFuture = 0) {
    const today = new Date();
    //Adjusts the date by the number of days in the future or today if parameter empty
    today.setDate(today.getDate() + daysInTheFuture); 

    const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const dayOfWeek = weekdays[today.getDay()];

    //Add 1 to get current month
    const month = today.getMonth() + 1;
    const date = today.getDate();

    //Weekday and date in separate lines for display
    return {weekday: dayOfWeek, monthDate: `${month}/${date}`};
}

function getAbsoluteDate(daysInTheFuture = 0) {
    const today = new Date();
    today.setDate(today.getDate() + daysInTheFuture); 
    return today
}

const boxFormat = {
    backgroundColor: 'background.default', padding: 1, borderRadius: 2
}

const gridFormat = {
    textAlign: "center"
}

function SingleColumn(daysFromToday) {

    const { weekday, monthDate } = getDate(daysFromToday);              
    return (
        <Grid container spacing={2} direction="column">  {/* Adjust spacing as needed */}
            <Grid item>
                <Box component="span" sx={{ typography: 'h5', fontWeight: 'bold', margin: 0 }}>{weekday}</Box>
            </Grid>
            <Grid item>
                <Box component="span"
                        sx={{
                            typography: 'h6',
                            fontWeight: 'bold',
                            color: daysFromToday === 0 ? 'white' : 'primary.main',
                            bgcolor: daysFromToday === 0 ? 'primary.main' : 'none',
                            p: 1, // Padding
                            borderRadius: 4,
                            margin: 1 // Added margin for spacing
                        }}>
                        {monthDate}
                </Box>
            </Grid>
            <Grid item>
                <Box sx={ boxFormat }><CalendarTaskList selectedDate={getAbsoluteDate(daysFromToday)}/></Box>
            </Grid>
        </Grid>

            
            
            
    );
}


function FullCalendarDisplay() {
  return (
    <Grid container spacing={2} justifyContent="space-evenly">
      <Grid item xs={2.4} sx={ gridFormat }>
        {SingleColumn(0)}
      </Grid>
      <Grid item xs={2.4} sx={ gridFormat }>
        {SingleColumn(1)}
      </Grid>
      <Grid item xs={2.4} sx={ gridFormat }>
        {SingleColumn(2)}
      </Grid>
      <Grid item xs={2.4} sx={ gridFormat }>
        {SingleColumn(3)}
      </Grid>
      <Grid item xs={2.4} sx={ gridFormat }>
        {SingleColumn(4)}
      </Grid>
    </Grid>
  );
}

export default FullCalendarDisplay;



