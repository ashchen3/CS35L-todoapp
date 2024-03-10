import { Box, Divider, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/material-icons/DeleteIcon";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function NewTaskForm({ handleChange, handleRemoveTask, i }) {
    return (
        <>
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
                        disabled={task.deadline === ""}
                        sx={{ width: "30%" }}
                        required
                    />
                </LocalizationProvider>
                <FormControlLabel
                    sx={{ ml: 3 }}
                    control={<Checkbox onClick={(e) => handleNoDeadlineChecked(e, i)} />}
                    label="No deadline"
                />
            </Box>
        </>
    );
}

export default NewTaskForm;
