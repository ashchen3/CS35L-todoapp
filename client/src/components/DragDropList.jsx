import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import DoneIcon from "@mui/icons-material/Done";
import { Box, Container, List, ListItem, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { TextField, FormControlLabel, Checkbox, Button, ClickAwayListener } from "@mui/material";
import { Unstable_Popup as Popup } from '@mui/base/Unstable_Popup';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../services/AuthContext";
import AddItemButton from "./AddItemButton";

function DraggableTaskItem({ task, index }) {
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
                    {task.title}
                </ListItem>
            )}
        </Draggable>
    );
}

function DroppableTaskList({ data, listId }) {
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
                        <DraggableTaskItem task={task} index={index} key={index} />
                    ))}
                    {provided.placeholder}
                </List>
            )}
        </Droppable>
    );
}

function CreateTaskPopup({ anchor, tasklistId, clickAwayHandler, handleTaskAdded }){

    const { token, logout } = useAuth();

    /** Resets the form to default values, when form loaded or submitted. */
    const resetForm = () => ({
        title: "",
        description: "",
    });
    const [formData, setFormData] = useState(resetForm);

    /** Handles when a form field is entered. */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name.split("-")[1]]: value,
        }));
    };

    /** Handles when the task's deadline is changed via the DateTimePicker. */
    const handleDeadlineChange = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            deadline: value.toISOString()
        }));
    };

    /** Handles when the task is set (or unset) to have a deadline. */
    const handleNoDeadlineChecked = () => {
        var deadline = "";
        if (formData.deadline === "") deadline = dayjs().toISOString();

        setFormData((prevData) => ({
            ...prevData,
            deadline,
        }));
    };

    /** POST the new form data to the server once the form has been submitted */
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3000/api/tasks/", 
                { ...formData, tasklistId: tasklistId },
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                // Update the parent state, then clear form
                handleTaskAdded(res.data);
                setFormData(resetForm);
            })
            .catch((err) => {
                console.log({ ...formData, tasklistId: tasklistId });
                if (err.response.status === 401) {
                    alert("You need to login again!");
                    logout();
                }
            });
    };

    return(
        <ClickAwayListener onClickAway={clickAwayHandler}>
            <Popup open={Boolean(anchor)} anchor={anchor} placement='bottom-start'>
                <Box
                    sx={{
                        mt: 1,
                        mb: 3,
                        py: 2,
                        px: 3,
                        border: 5,
                        borderColor: "secondary.main",
                        borderWidth: 5,
                        borderRadius: 5,
                        bgcolor: "#FFFFFF"
                    }}
                    id="add-task-form"
                >
                    <Typography variant="h6" sx={{ mb: "0.25em" }}>
                        New Task
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        {/* Task title field */}
                        <TextField
                            label='Title'
                            name="task-title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            sx={{ width: "100%", my: 1 }}
                            size="small"
                        />

                        {/* Task description field */}
                        <TextField
                            label="Description"
                            name="task-description"
                            value={formData.description}
                            onChange={handleChange}
                            sx={{ width: "100%", mb: 1 }}
                            size="small"
                        />

                        {/* Task deadline, and checkbox to disable deadline */}
                        <Box sx={{ mb: 1 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDateTimePicker
                                    label="Deadline"
                                    name="task-deadline"
                                    value={formData.deadline ? dayjs(formData.deadline) : dayjs()}
                                    onChange={handleDeadlineChange}
                                    disabled={formData.deadline === ""}
                                    sx={{ width: "30%" }}
                                    required
                                />
                            </LocalizationProvider>
                            <FormControlLabel
                                sx={{ ml: 3 }}
                                control={
                                    <Checkbox onClick={handleNoDeadlineChecked} />
                                }
                                label="No deadline"
                            />
                        </Box>

                        {/* Submit button */}
                        <Button
                            sx={{
                                display: "flex",
                                my: '1em',
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Add task
                        </Button>
                    </form>
                </Box>
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
function DragDropList({ tasklist, handleTaskAdded }) {
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
                    <CreateTaskPopup anchor={popupAnchor} tasklistId={tasklist?.id} clickAwayHandler={clickAwayHandler} handleTaskAdded={handleTaskAdded}/>
                    <DroppableTaskList data={uncompletedTasks} listId="uncompleted" />
                </Grid>
                <Grid xs={12} sm={5.5} sx={{ p: 2 }}>
                    <Stack
                        sx={{
                            height: "10%",
                            direction: "column",
                            justifyContent: "center",
                            width: "fit-content",
                        }}
                    >
                        <Typography variant="h5" color="primary">
                            Completed
                        </Typography>
                    </Stack>
                    <DroppableTaskList data={completedTasks} listId="completed" />
                </Grid>
            </DragDropContext>
        </Grid>
    );
}

export default DragDropList;
