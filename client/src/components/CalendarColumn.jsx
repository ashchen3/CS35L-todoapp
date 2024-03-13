import { Box, Grid } from '@mui/material';
import React, {useState, useEffect} from 'react';
import axios from "axios";
import useAuth from "../services/AuthContext";

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

function SingleColumn(inputJson, daysFromToday) {

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
                <Box sx={ boxFormat }><CalendarTaskList inputJson={inputJson} selectedDate={getAbsoluteDate(daysFromToday)}/></Box>
            </Grid>
        </Grid>

            
            
            
    );
}


const colWidth = 1.7

function FullCalendarDisplay() {
    const [taskList, setTasklists] = useState([])
    const { token, logoutOnTokenExpiry } = useAuth();

    // Fetch tasklists' names and ids
    useEffect(() => {
        console.log("GET tasklists from /api/lists");
        axios
            .get("http://localhost:3000/api/lists", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            })
            .then((res) => setTasklists(res.data))
            .catch((err) => {
                logoutOnTokenExpiry(err);
            });
    }, []);

    //at this point taskList is the full json.

    const cols = [...Array(7)].map((_, index) => SingleColumn(taskList, index));

    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="space-evenly">
            {cols.map((col) => (
                <Grid item xs={colWidth} sx={gridFormat} key={col.key}>
                    {col}
                </Grid>
            ))}
        </Grid>
    );
}

export default FullCalendarDisplay;



