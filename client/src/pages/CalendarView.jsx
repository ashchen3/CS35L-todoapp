import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 'calc(100vh - 48px)', // Adjust based on your header/footer height
  }));
  
function getDate(daysInTheFuture = 0) {
    const today = new Date();
    today.setDate(today.getDate() + daysInTheFuture); // Adjust the date by the number of days in the future

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = weekdays[today.getDay()]; // Get the weekday name

    const month = today.getMonth() + 1; // JavaScript months are 0-based, so add 1 to normalize
    const date = today.getDate();

    // Split weekday and date into separate lines for display
    return {weekday: dayOfWeek, monthDate: `${month}/${date}`};
}
  
function FormRow() {
  // Generate an array [0, 1, 2, 3, 4] for the next 5 days including today
  const daysArray = Array.from({ length: 5 }, (_, index) => index);

  return (
    <React.Fragment>
      {daysArray.map((day) => (
        <Grid item xs={2} key={day}>
          <Typography
            variant="body1"
            gutterBottom
            component="div"
            sx={{
              textAlign: 'center',
              pt: 2, // Adds top padding uniformly for all items
            }}
          >
            {(() => {
              const { weekday, monthDate } = getDate(day);
              return (
                <>
                  <Box component="span" sx={{ fontWeight: 'bold' }}>{weekday}</Box><br />
                  <Box component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{monthDate}</Box>
                </>
              );
            })()}
          </Typography>
          <Item>Item</Item>
        </Grid>
      ))}
    </React.Fragment>
  );
}

function CalendarView() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid container item spacing={0} justifyContent="space-around">
          <FormRow />
        </Grid>
      </Grid>
    </Box>
  );
}

export default CalendarView;
