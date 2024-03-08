import React, {useState, useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import sampleData from '../sample_data.json';


function TaskList({ tasks }) {
  return (
    <List dense={false}>
      {tasks.map((task) => (
        <ListItem key={task}>
          <ListItemText
            primary={<Typography variant="body1">{task}</Typography>}
          />
        </ListItem>
      ))}
    </List>
  );
}


function getTasksByDeadline(jsonData, inputDate) {
    // Parse the input date string into a Date object
    const date = new Date(inputDate);
    const matchingTasks = [];
  
    for (const taskList of jsonData) {
      for (const task of taskList.tasks) {
        // Check if the deadline exists and convert it to a Date object
        if (task.deadline) {
          const deadline = new Date(task.deadline);
  
          // Validate Date is the same
          if (deadline.getFullYear() === date.getFullYear() &&
              deadline.getMonth() === date.getMonth() &&
              deadline.getDate() === date.getDate()) {
            matchingTasks.push("List: " + taskList.title + " | Task: " + task.title); // Return task list title if deadlines match
          }
        }
      }
    }
    return matchingTasks;
}

const CalendarTaskList = () => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const tasksDue = getTasksByDeadline(sampleData, currentDate);

    return (
        <div>
        <Typography variant="h5">Tasks Due Today</Typography>
        <Typography variant="h7">{currentDate.toLocaleString()}</Typography>
        {tasksDue.length > 0 ? (
            <TaskList tasks={tasksDue} />
        ) : (
            <Typography variant="body1">No tasks due today.</Typography>
        )}
        </div>
    );
};

export default CalendarTaskList;



