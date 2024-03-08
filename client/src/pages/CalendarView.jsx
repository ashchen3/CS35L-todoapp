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
    height: 'calc(100vh - 48px)', 
  }));
  
function getDate(daysInTheFuture = 0) {
    const today = new Date();
    //Adjusts the date by the number of days in the future or today if parameter empty
    today.setDate(today.getDate() + daysInTheFuture); 

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = weekdays[today.getDay()];

    //Add 1 to get current month
    const month = today.getMonth() + 1; e
    const date = today.getDate();

    //Weekday and date in separate lines for display
    return {weekday: dayOfWeek, monthDate: `${month}/${date}`};
}
  
function FormRow() {
  //Generate array for today and next 4 days
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
              pt: 2,
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

