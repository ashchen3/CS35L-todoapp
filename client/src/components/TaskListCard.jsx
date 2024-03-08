import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";

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
 * A single Card component that displays the tasklist.
 */
// TODO: add more fields
function TaskListCard({tasklist}) {

    const handleAddTask = () => {
        //TODO: handle adding a task
    };
    // console.log(tasklist);

    return (
        <Item>
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        {tasklist.title}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Box sx={{ mt: 1, mb: 3 }} id="new-list-form">
                            <TextField
                                //TODO: IMPLEMENTATION IS NOT FUNCTIONAL YET
                                type="text"
                                placeholder="Task 1"
                                size="small"
                                //value={props.category}
                                //onChange={props.onChange}
                                sx={{ mb: 1 }}
                                fullWidth
                                required
                            />
                        <Button size="small" startIcon={<AddCircleOutline />} onClick={handleAddTask}>
                            Add Task
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Item>
    );
}

export default TaskListCard;
