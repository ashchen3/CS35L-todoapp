import ChecklistIcon from "@mui/icons-material/Checklist";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";

import useAuth from "../services/AuthContext";

function NewListForm({ handleTasklistAdded }) {
    const { token, logout } = useAuth();

    /** Resets the form to default values, when form loaded or submitted. */
    const resetForm = () => ({
        title: "",
        description: "",
        tasks: [],
    });
    const [formData, setFormData] = useState(resetForm);

    /** Handles when a (basic) form field is entered. */
    const handleChange = (e, i) => {
        const { name, value } = e.target;
        if (name === "tasklist-title" || name === "tasklist-description") {
            setFormData((prevData) => ({
                ...prevData,
                [name.split("-")[1]]: value,
            }));
        } else {
            const tasks = [...formData.tasks];
            tasks[i][name.split("-")[1]] = value;
            setFormData((prevData) => ({
                ...prevData,
                tasks,
            }));
        }
    };

    /** Handles when a task's deadline is changed via the DateTimePicker. */
    const handleDeadlineChange = (value, i) => {
        const tasks = [...formData.tasks];
        tasks[i]["deadline"] = value.toISOString();
        setFormData((prevData) => ({
            ...prevData,
            tasks,
        }));
    };

    /** Handles when a task is set (or unset) to have deadline. */
    const handleNoDeadlineChecked = (e, i) => {
        const tasks = [...formData.tasks];
        if (tasks[i]["deadline"] === "") {
            tasks[i]["deadline"] = dayjs().toISOString();
        } else {
            tasks[i]["deadline"] = "";
        }
        setFormData((prevData) => ({
            ...prevData,
            tasks,
        }));
    };

    /** Handles when a task is set (or unset) to be completed. */
    const handleCompletedChecked = (e, i) => {
        const tasks = [...formData.tasks];
        tasks[i]["completed"] = !tasks[i]["completed"];
        setFormData((prevData) => ({
            ...prevData,
            tasks,
        }));
    };

    /** Handles when the "Add Task" button is clicked to display a new row of inputs for a new task. */
    const handleAddTask = () => {
        setFormData((prevData) => ({
            ...prevData,
            tasks: [
                ...prevData.tasks,
                {
                    title: "",
                    description: "",
                    deadline:
                        prevData.tasks.length && prevData.tasks.at(-1).deadline
                            ? prevData.tasks.at(-1).deadline
                            : dayjs().toISOString(), // "autocomplete" feature to use the previous task's deadline
                    completed: false,
                },
            ],
        }));
    };

    /** Handles when the trash bin icon is clicked to remove a row of tasks. */
    const handleRemoveTask = (index) => {
        const tasks = [...formData.tasks];
        tasks.splice(index, 1);
        setFormData((prevData) => ({
            ...prevData,
            tasks,
        }));
    };

    /** POST the new form data to the server once form submitted */
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3000/api/lists/", formData, {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                // Update the parent state, then clear form
                handleTasklistAdded(res.data);
                setFormData(resetForm);
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    alert("You need to login again!");
                    logout();
                }
            });
    };

    return (
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
            }}
            id="new-list-form"
        >
            <Typography variant="h5" sx={{ mb: 1 }}>
                New Tasklist
            </Typography>
            <form onSubmit={handleSubmit}>
                {/* Tasklist title, required field */}
                <TextField
                    name="tasklist-title"
                    label="Tasklist name"
                    size="small"
                    value={formData.title}
                    onChange={handleChange}
                    sx={{ mb: 1 }}
                    fullWidth
                    required
                />
                {/* Tasklist description, optional */}
                <TextField
                    name="tasklist-description"
                    label="Enter a description"
                    size="small"
                    value={formData.description}
                    onChange={handleChange}
                    sx={{ mb: 1 }}
                    fullWidth
                />

                {/* Add new tasks */}
                {formData.tasks.map((task, i) => (
                    <Box key={i} sx={{ width: "100%" }}>
                        <Divider sx={{ borderWidth: 1, my: 1 }} />

                        {/* Task number and delete icon */}
                        <Box sx={{ display: "flex" }}>
                            <Typography variant="h6" sx={{ width: "95%" }}>
                                Task {i + 1}
                            </Typography>
                            <IconButton sx={{ width: "5%" }} onClick={() => handleRemoveTask(i)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>

                        {/* Task title field */}
                        <TextField
                            label={`Task ${i + 1}`}
                            name="task-title"
                            value={task.title}
                            onChange={(e) => handleChange(e, i)}
                            required
                            sx={{ width: "100%", my: 1 }}
                            size="small"
                        />

                        {/* Task description field */}
                        <TextField
                            label="Task description"
                            name="task-description"
                            value={task.description}
                            onChange={(e) => handleChange(e, i)}
                            sx={{ width: "100%", mb: 1 }}
                            size="small"
                        />

                        {/* Task deadline, and checkbox to disable deadline */}
                        <Box sx={{ mb: 1 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDateTimePicker
                                    label="Deadline"
                                    name="task-deadline"
                                    value={task.deadline ? dayjs(task.deadline) : dayjs()}
                                    onChange={(v) => handleDeadlineChange(v, i)}
                                    disabled={!task.deadline || task.completed}
                                    sx={{ width: "30%" }}
                                    required
                                />
                            </LocalizationProvider>
                            <FormControlLabel
                                sx={{ ml: 3 }}
                                control={
                                    <Checkbox onClick={(e) => handleNoDeadlineChecked(e, i)} />
                                }
                                disabled={task.completed}
                                label="No deadline"
                            />
                            <FormControlLabel
                                sx={{ ml: 3 }}
                                control={<Checkbox onClick={(e) => handleCompletedChecked(e, i)} />}
                                disabled={!task.deadline}
                                label="Completed"
                            />
                        </Box>
                    </Box>
                ))}

                {/* Button to display a new row, to add a new task */}
                <Button
                    onClick={handleAddTask}
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ my: 1 }}
                >
                    Add Task
                </Button>

                {/* Submit button */}
                <Button
                    sx={{
                        display: "flex",
                        my: 1,
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<ChecklistIcon />}
                >
                    Add list
                </Button>
            </form>
        </Box>
    );
}

export default NewListForm;
