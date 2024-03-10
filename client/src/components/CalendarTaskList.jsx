import React, {useState, useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import sampleData from '../sample_data.json';


function TaskList({ tasks }) {
  return (
    <List dense={false}>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <ListItem key={task.id} sx={{ display: 'flex', justifyContent: 'center' }}>
            <ListItemButton>
                <ListItemText
                primary={
                    <>
                    <Typography variant="body1">{task.listTitle}</Typography>
                    <Typography variant="body2"> - {task.taskData.title}</Typography>
                    </>
                }
                />
            </ListItemButton>
            
          </ListItem>
        ))
      ) : (
        <ListItem>
          <ListItemText primary={<Typography variant="body1">No tasks due</Typography>} />
        </ListItem>
      )}
    </List>
  );
}


function getTasksByDeadline(jsonData, inputDate) {
    // Parse the input date string into a Date object
    const date = new Date(inputDate);
    const matchingTasks = [];
  
    for (const taskList of jsonData) {
      for (const task of taskList.tasks) {
        if (task.deadline) {
          const deadline = new Date(task.deadline);
  
          // Validate Date is the same
          if (deadline.getFullYear() === date.getFullYear() &&
              deadline.getMonth() === date.getMonth() &&
              deadline.getDate() === date.getDate()) {
            matchingTasks.push({
                listTitle: taskList.title,
                taskData: task
            }); // Return task list title if deadlines match
            //We can get taskList.title if we want to group by color
            //If task is completed, we can strikethrough the task
            //taskList.tasks.task
          }
        }
      }
    }
    return matchingTasks;
}

const CalendarTaskList = ({ selectedDate }) => {

    const [tasksDue, setTasksDue] = useState([]);

    useEffect(() => {
        const filteredTasks = getTasksByDeadline(sampleData, selectedDate);
        setTasksDue(filteredTasks);
    }, [selectedDate]);

    return (
        <div>
            <TaskList tasks={tasksDue} />
        </div>
    );
};

export default CalendarTaskList;



