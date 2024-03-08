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
}));

function getDate(daysInTheFuture = 0) {
    const today = new Date();
    today.setDate(today.getDate() + daysInTheFuture); // Adjust the date by the number of days in the future

    const month = today.getMonth() + 1; // JavaScript months are 0-based, so add 1 to normalize
    const year = today.getFullYear();
    const date = today.getDate();
  
    return `${month}/${date}/${year}`;
  }
  
function FormRow() {
  return (
    <React.Fragment>
      <Grid item xs={2}>
        <Typography variant="body1" gutterBottom>
            {getDate()}
        </Typography>

        <Item>Item</Item>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1" gutterBottom>
            {getDate(1)}
        </Typography>

        <Item>Item</Item>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1" gutterBottom>
            {getDate(2)}
        </Typography>
        <Item>Item</Item>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1" gutterBottom>
            {getDate(3)}
        </Typography>

        <Item>Item</Item>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1" gutterBottom>
            {getDate(4)}
        </Typography>

        <Item>Item</Item>
      </Grid>            
    </React.Fragment>
  );
}

function CalendarView() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid container item spacing={3} justifyContent="space-around">
          <FormRow />
        </Grid>
      </Grid>
    </Box>
  );
}

export default CalendarView;
