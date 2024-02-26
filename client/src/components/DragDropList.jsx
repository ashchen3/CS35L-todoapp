import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import DoneIcon from "@mui/icons-material/Done";
import { Box, List, ListItem, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect, useState } from "react";
import testData from "../data/tasks.json";
import AddItemButton from "./AddItemButton";

function DraggableTaskItem({ task, index }) {
    return (
        <Draggable key={task.tasklistId} draggableId={task.tasklistId} index={index}>
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
                    {data.map((task, index) => (
                        <DraggableTaskItem task={task} index={index} key={index} />
                    ))}
                    {provided.placeholder}
                </List>
            )}
        </Droppable>
    );
}

function DragDropList({ category }) {
    const [completedTasks, setCompletedTasks] = useState([]);
    const [uncompletedTasks, setUncompletedTasks] = useState([]);

    useEffect(() => {
        console.log(category);
        // TODO: GET data from API using `category`
        setUncompletedTasks(testData.filter((task) => !task.completed));
        setCompletedTasks(testData.filter((task) => task.completed));
    }, []);

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
        // TODO: make a PUT request to server to update completion status
        removed.completed = toCompleted;

        // Update corresponding completed and uncompleted tasks state
        const setSource = fromCompleted ? setCompletedTasks : setUncompletedTasks;
        const setDest = toCompleted ? setCompletedTasks : setUncompletedTasks;
        setSource(sourceCopy);
        setDest(destCopy);
    };

    return (
        <Grid container columnGap={5} rowGap={0} sx={{ justifyContent: "center", height: "100%" }}>
            <DragDropContext onDragEnd={dragEnd}>
                <Grid xs={12} md={5.5} sx={{ p: 2 }}>
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
                        <AddItemButton onClick={() => {}} buttonText="" isClicked={false} />
                        <Typography variant="h5" color="primary" sx={{pl: 2}}>
                            Uncompleted
                        </Typography>
                    </Stack>
                    <DroppableTaskList data={uncompletedTasks} listId="uncompleted" />
                </Grid>
                <Grid xs={12} md={5.5} sx={{ p: 2 }}>
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
