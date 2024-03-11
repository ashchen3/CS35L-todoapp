import { Box, TextField, FormControlLabel, Checkbox, Button, Typography } from "@mui/material";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import axios from "axios";
import useAuth from "../services/AuthContext";
import { useState } from "react";


function NewTaskForm({ tasklistId, handleTaskAdded }) {

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
    );
}

export default NewTaskForm;
