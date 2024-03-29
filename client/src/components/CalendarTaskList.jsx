import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";

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


function TaskList({ tasks }) {
    return (
        <>
        <List>
        {tasks.length > 0 ? (
            tasks.map((task) => (
            <>
            <ListItem key={task.id}>
                <ListItemButton sx={{ maxWidth: '100%', borderRadius:5, textAlign:'center'}}
                    component={Link} 
                    to="/list" 
                    state={{ selectedTasklistId: task.taskData.tasklistId }}
                >
                    <ListItemText sx={{ textDecoration: task.taskData.completed ? 'line-through' : 'none' }}
                    primary={
                        <>
                            <Typography variant="body1">{task.listTitle}</Typography>
                            <Typography variant="body2">{task.taskData.title}</Typography>
                        </>
                    }
                    />
                </ListItemButton> 
            </ListItem>
            <Divider variant="middle" component="li"/>
            </>
            ))
        ) : (
            <ListItem>
                <ListItemButton sx={{ maxWidth: '100%', borderRadius:5, textAlign:'center'}}
                    component={Link} 
                    to="/" 
                >
                    <ListItemText primary={<Typography variant="body1">No tasks due</Typography>}/>
                </ListItemButton>
            </ListItem>
        )}
        </List>
        </>
    );
}


const CalendarTaskList = ({ inputJson, selectedDate }) => {

    return (
        <div>
            <TaskList tasks={getTasksByDeadline(inputJson, selectedDate)} />
        </div>
    );
};

export default CalendarTaskList;



