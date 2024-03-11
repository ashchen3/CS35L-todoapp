import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import { List, ListItem, Stack, Typography, ClickAwayListener, Fab, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Unstable_Popup as Popup } from '@mui/base/Unstable_Popup';

import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../services/AuthContext";
import AddItemButton from "./AddItemButton";
import NewTaskForm from "./NewTaskForm";

function DraggableTaskItem({ task, index, onDelete }) {
    return (
        <Draggable key={task.id} draggableId={task.id?.toString()} index={index}>
            {(provided, snapshot) => (
                <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{
                        m: "1px",
                        borderRadius: "4px",

                        backgroundColor: snapshot.isDragging ? "rgb(247, 247, 247)" : "#fff",
                        border: snapshot.isDragging ? "1px solid black" : "none",
                        "&:hover": {
                            border: "1px solid black",
                        },
                    }}
                >
                    {task.completed ? <DoneIcon /> : <></>}

                    <Typography
                        noWrap
                        sx={{
                            width: "12em",
                            pr: "2rem",
                        }}
                    >
                        {task.title}
                    </Typography>

                    <Typography
                        noWrap
                        sx={{
                            fontSize: 14,
                            pr: "2rem",
                            maxWidth: "15rem"
                        }}
                    >
                        {task.description}
                    </Typography>

                    <IconButton
                        sx={{
                            marginLeft: "auto"
                        }}
                        onClick={() => onDelete(task)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </ListItem>
            )}
        </Draggable>
    );
}

function DroppableTaskList({ data, listId, onTaskDelete }) {
    return (
        <Droppable droppableId={listId}>
            {(provided, snapshot) => (
                <List
                    sx={{
                        cursor: "grab",
                        mt: 1,
                        p: 1,
                        border: "1px solid black",
                        height: { md: "80%" },
                    }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {data?.map((task, index) => (
                        <DraggableTaskItem task={task} index={index} onDelete={onTaskDelete} key={index} />
                    ))}
                    {provided.placeholder}
                </List>
            )}
        </Droppable>
    );
}

const DeleteTaskBucket = ({ data, listId }) => {
    return (
        <Droppable droppableId='delete'>
            {(provided, snapshot) => (
                <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    sx={{
                        cursor: "grab",
                        textTransform: "none", 
                        my: 1,
                        p: 1,
                        py: "1.25em",
                        marginLeft: "auto",
                        maxWidth: "15em"
                    }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    aria-label="delete"
                >
                    Drag here to delete!
                    {provided.placeholder}
                </Fab>
            )}
        </Droppable>
    );
};

function CreateTaskPopup({ anchor, setPopupAnchor, tasklistId, clickAwayHandler, handleTaskAdded }){

    return(
        <ClickAwayListener onClickAway={clickAwayHandler}>
            <Popup open={Boolean(anchor)} anchor={anchor} placement='bottom-start'>
                <NewTaskForm tasklistId={tasklistId} handleTaskAdded={handleTaskAdded} setPopupAnchor={setPopupAnchor}/>
            </Popup>
        </ClickAwayListener>
    );
}

/**
 * Takes in a tasklist as prop, sample:
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
    }
 */
function DragDropList({ tasklist, handleTaskAdded, setTasklist }) {
    const [completedTasks, setCompletedTasks] = useState();
    const [uncompletedTasks, setUncompletedTasks] = useState();
    const [popupAnchor, setPopupAnchor] = useState(null);
    const { token, logout } = useAuth();

    useEffect(() => {
        setCompletedTasks(tasklist?.tasks?.filter((t) => t.completed));
        setUncompletedTasks(tasklist?.tasks?.filter((t) => !t.completed));
    }, [tasklist]);

    /**
     * Both functions sets the anchor property (which the CreateTasKPopup's open property is based on)
     * Button clicking toggles the popup, while clicking away removes the popup
     */
    const handleAddTaskButtonClick = (e) => {
        e.stopPropagation();
        setPopupAnchor(popupAnchor ? null : e.currentTarget);
    };
    const clickAwayHandler = () => {
        setPopupAnchor(null);
    };

    /**
     * Handles non-dragging individual task deletion behavior
     */
    const onTaskDelete = (task) => {
        const tasksCopy = task.completed ? [...completedTasks] : [...uncompletedTasks];
        const setTasks = task.completed ? setCompletedTasks : setUncompletedTasks;
        tasksCopy.splice(tasksCopy.findIndex((someTask) => task.id === someTask.id), 1);

        const tasklistTasks = tasklist?.tasks?.filter((someTask) => someTask.id !== task.id);

        // Send a DELETE request to server to delete the task
        axios
            .delete(
                `http://localhost:3000/api/tasks/${task.id}`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            .then(() => {
                setTasks(tasksCopy);
                setTasklist((prev) => ({
                    ...prev,
                    tasks: tasklistTasks
                }))
            })
            .catch((err) => {
                if (err?.response.status === 401) {
                    alert("You need to login again!");
                    logout();
                }
            });
    }

    /**
     * Handles when an item is dragged to somewhere.
     *
     * @param result - A JSON object containing the result of a drag,
     * specified by `react-beautiful-dnd`. Useful fields are `source` and
     * `destination`, which each contain a `droppableId` and `index` field.
     */
    const dragEnd = (result) => {
        // Ignore if drag out of draggable area
        if (!result.destination) {
            return;
        }
        const taskId = parseInt(result.draggableId);

        // Determine where item is dragged from and to, as a boolean flag
        const fromCompleted = result.source.droppableId === "completed";
        const toCompleted = result.destination.droppableId === "completed";
        const toDelete = result.destination.droppableId === "delete";

        // Handle task deletion
        if (toDelete){
            const sourceCopy = fromCompleted ? [...completedTasks] : [...uncompletedTasks];
            const setSource = fromCompleted ? setCompletedTasks : setUncompletedTasks;
            sourceCopy.splice(result.source.index, 1);

            const tasklistTasks = tasklist?.tasks?.filter((task) => task.id !== taskId);
            
            // Send a DELETE request to server to delete the task
            axios
                .delete(
                    `http://localhost:3000/api/tasks/${taskId}`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                )
                .then(() => {
                    setSource(sourceCopy);
                    setTasklist((prev) => ({
                        ...prev,
                        tasks: tasklistTasks
                    }))
                })
                .catch((err) => {
                    if (err?.response.status === 401) {
                        alert("You need to login again!");
                        logout();
                    }
                });
            return;
        }

        // Copy of arrays to manipulate
        const sourceCopy = fromCompleted ? [...completedTasks] : [...uncompletedTasks];
        const destCopy = toCompleted ? [...completedTasks] : [...uncompletedTasks];
        const [removed] = sourceCopy.splice(result.source.index, 1);

        // Same source and destination, insert object at new location
        if (fromCompleted == toCompleted) {
            sourceCopy.splice(result.destination.index, 0, removed);
            fromCompleted ? setCompletedTasks(sourceCopy) : setUncompletedTasks(sourceCopy);
            return;
        }

        // Different source and destination, insert object at new location
        destCopy.splice(result.destination.index, 0, removed);
        const setSource = fromCompleted ? setCompletedTasks : setUncompletedTasks;
        const setDest = toCompleted ? setCompletedTasks : setUncompletedTasks;
        
        // Send a PUT request to server to update completion status
        axios
            .put(
                `http://localhost:3000/api/tasks/${taskId}`,
                {
                    completed: toCompleted,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
                )
            .then(() => {
                // Update corresponding completed and uncompleted tasks state
                removed.completed = toCompleted;
                setSource(sourceCopy);
                setDest(destCopy);
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    alert("You need to login again!");
                    logout();
                }
            });
    };

    return (
        <Grid
            container
            columnGap={5}
            rowGap={0}
            sx={{ justifyContent: "center", height: { xs: "50%", sm: "100%" } }}
        >
            <DragDropContext onDragEnd={dragEnd}>
                <Grid xs={12} sm={5.5} sx={{ p: 2 }}>
                    <Stack
                        sx={{
                            height: "10%",
                            width: "fit-content",
                            flexWrap: "wrap",
                            display: "flex",
                            direction: "column",
                            justifyContent: "center",
                        }}
                    >
                        <AddItemButton onClick={handleAddTaskButtonClick} buttonText="" isClicked={false} />
                        <Typography variant="h5" color="primary" sx={{ pl: 2 }}>
                            Uncompleted
                        </Typography>
                    </Stack>
                    <CreateTaskPopup 
                        anchor={popupAnchor} setPopupAnchor={setPopupAnchor} 
                        tasklistId={tasklist?.id} clickAwayHandler={clickAwayHandler} handleTaskAdded={handleTaskAdded}/>
                    <DroppableTaskList data={uncompletedTasks} listId="uncompleted" onTaskDelete={onTaskDelete} />
                </Grid>
                <Grid xs={12} sm={5.5} sx={{ p: 2 }}>
                    <Stack
                            sx={{
                                height: "10%",
                                justifyContent: "center",
                                flexWrap: "wrap",
                                direction: "column",
                            }}
                        >
                            <Typography variant="h5" color="primary">
                                Completed
                            </Typography>
                            <DeleteTaskBucket sx={{marginLeft:"auto"}} listId="deleted" />
                    </Stack>
                    <DroppableTaskList data={completedTasks} listId="completed" onTaskDelete={onTaskDelete} />
                </Grid>
            </DragDropContext>
        </Grid>
    );
}

export default DragDropList;
