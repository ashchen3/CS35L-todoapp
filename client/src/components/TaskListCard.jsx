import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { CardActionArea, CardActions } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Some styles for a single Card.
 */
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    textAlign: "left",
    color: theme.palette.text.secondary,
}));

/**
 * ExpandMore icon to show more details.
 */
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

/**
 * For a given tasklist's uncompleted tasks, return a collapsible component
 * displaying a simple list of these tasks.
 */
const CollapsibleTasks = ({ uncompletedTasks }) => {
    const currentDate = new Date();
    const oneDay = 1000 * 60 * 60 * 24;
    const oneHour = 1000 * 60 * 60;

    return (
        <CardContent>
            {uncompletedTasks.map((task) => {
                const diff = task.deadline ? new Date(task.deadline) - currentDate : null;

                return (
                    <Box sx={{ display: "flex" }} key={task.id}>
                        <Typography variant="body2">{task.title}</Typography>
                        {task.deadline && (
                            <Typography variant="caption" marginLeft="auto">
                                {diff > oneDay && `${diff / oneDay} days left`}
                                {diff > 0 && diff <= oneDay && `${diff / oneHour} hours left`}
                                {diff < 0 && "Overdue!"}
                            </Typography>
                        )}
                    </Box>
                );
            })}
        </CardContent>
    );
};

/**
 * A single Card component that displays the tasklist.
 * Sample tasklist object passed as prop:
 * {
       "id": 3,
       "title": "Errands for today",
       "description": "Try to get everything done by 9pm",
       "quickAccessTaskList": null,
       "userId": 1,
       "createdAt": "2024-02-28T09:03:28.136Z",
       "updatedAt": "2024-02-28T09:03:28.136Z",
       "tasks": [
           {
               "id": 4,
               "title": "Pick up kid from preschool",
               "description": "Leave by 5pm else the jam will start",
               "completed": false,
               "deadline": null,
               "tasklistId": 3,
               "createdAt": "2024-02-28T09:03:28.157Z",
               "updatedAt": "2024-02-28T09:03:28.157Z"
           }
       ]
   },
 */
function TaskListCard({ tasklist }) {
    const [expanded, setExpanded] = useState(false);

    /** Toggle card expansion. */
    const handleExpanded = () => {
        setExpanded(!expanded);
    };

    // All uncompleted tasks
    const uncompletedTasks = tasklist.tasks.filter((t) => !t.completed);

    return (
        <Item>
            <Card>
                {/* Display task title and description */}
                <CardActionArea 
                    component={Link} 
                    to="/list" 
                    state={{ selectedTasklistId: tasklist.id }}
                    style={{ textDecoration: "none" }}>
                    <CardContent>
                        <Typography variant="h5" color="primary">
                                {tasklist.title}
                        </Typography>
                        <Typography variant="subtitle1">{tasklist.description}</Typography>
                    </CardContent>
                </CardActionArea>
                <Divider />
                {/* Display number of uncompleted tasks and a dropdown button */}
                <CardContent sx={{ py: 1, display: "flex", alignItems: "center" }}>
                    <Typography variant="body2">
                        {uncompletedTasks.length > 0
                            ? `You have ${uncompletedTasks.length} uncompleted task(s).`
                            : "You have completed all tasks!"}
                    </Typography>
                    <ExpandMore expand={expanded} onClick={handleExpanded}>
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardContent>
                {/* Display list of uncompleted tasks when expanded */}
                <Collapse in={expanded} unmountOnExit>
                    <CollapsibleTasks uncompletedTasks={uncompletedTasks} />
                </Collapse>
            </Card>
        </Item>
    );
}

export default TaskListCard;
