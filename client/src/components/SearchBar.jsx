import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function SearchBar({ tasklistData }) {
    const navigate = useNavigate();

    /** Handles when a search item is clicked; brings user to list view. */
    const handleSearchClicked = (event, option) => {
        var tasklistId;
        if (option.type == "Tasks") {
            tasklistId = option.tasklist.id;
        } else {
            tasklistId = option.id;
        }
        navigate("/list", {
            state: { selectedTasklistId: tasklistId },
        });
    };

    return (
        <Autocomplete
            disablePortal
            fullWidth
            clearOnBlur={false}
            display="flex"
            id="tasklist-and-task-search"
            options={reformatTasklistData(tasklistData)}
            getOptionLabel={(option) => option.title}
            isOptionEqualToValue={(option, value) =>
                option.title.toLowerCase().includes(value.title.toLowerCase())
            }
            groupBy={(option) => option.type}
            // Redirects to list view upon clicking on any element
            onChange={(e, option) => handleSearchClicked(e, option)}
            renderInput={renderSearchBarInput}
            renderOption={renderSearchBarOption}
        />
    );
}

/**
 * Formats the searchbar data; combines tasklists and tasks to form a list.
 */
function reformatTasklistData(tasklistData) {
    if (!tasklistData) return [];

    const tasklists = JSON.parse(JSON.stringify(tasklistData)); // Note that this cloning process converts Dates to strings
    tasklists.forEach((tasklist) => {
        delete tasklist.tasks;
        tasklist.type = "Tasklists";
    });

    const tasks = []
        .concat(
            ...tasklistData.map((tasklist) =>
                tasklist.tasks.map((task) => {
                    task["tasklist"] = {
                        id: tasklist.id,
                        title: tasklist.title,
                    };
                    return task;
                })
            )
        )
        .map((task) => ({ ...task, type: "Tasks" }));

    return [...tasklists, ...tasks];
}

function renderSearchBarInput(params) {
    return (
        <TextField
            {...params}
            label="Search your lists..."
            sx={{
                margin: "10px auto",
            }}
        />
    );
}

function renderSearchBarOption(props, option) {
    return (
        <Box
            component="li"
            style={{
                display: "flex",
            }}
            {...props}
            key={`${option.type}-${option.id}`}
        >
            <Typography
                noWrap
                sx={{
                    width: 250,
                    pr: "1em",
                }}
            >
                {option.title}
            </Typography>

            {option.type === "Tasks" && (
                <Typography
                    noWrap
                    color="#9e9e9e"
                    sx={{
                        width: 250,
                    }}
                >
                    In <i>{option.tasklist.title}</i>
                </Typography>
            )}
        </Box>
    );
}

export default SearchBar;
