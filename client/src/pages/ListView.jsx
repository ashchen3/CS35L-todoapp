import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DragDropList from "../components/DragDropList";
import useAuth from "../services/AuthContext";
import NavBar from "../components/NavBar";

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
function ListView() {
    const [tasklists, setTasklists] = useState([]);
    const [selectedTasklist, setSelectedTasklist] = useState({});
    const { token, logoutOnTokenExpiry } = useAuth();
    const location = useLocation();
    const selectedTasklistId = location.state ? location.state.selectedTasklistId : null;

    /** Callback to handle when a task is added, namely update the `selectedTasklist` state. */
    const handleTaskAdded = (task) => {
        const newTasks = [...selectedTasklist.tasks, task];
        setSelectedTasklist((prev) => ({ ...prev, tasks: newTasks }));
    };

    // Fetch and update tasklists' names and ids
    useEffect(() => {
        console.log("GET tasklists from /api/lists");
        axios
            .get("http://localhost:3000/api/lists", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            })
            .then((res) => {
                setTasklists(res.data);
                if (selectedTasklistId) {
                    setSelectedTasklist(res.data.filter((t) => t.id === selectedTasklistId)[0]);
                }
            })
            .catch((err) => {
                logoutOnTokenExpiry(err);
            });
    }, []);

    return (
        <>
            <NavBar centerText={selectedTasklist?.title}/>
            <Box sx={{ px: 5, bgcolor: "primary.background", height: "100%" }} id="list">
                {/* TODO: dropdown/navbar with all other tasklists here */}
                <Box sx={{ height: "85%" }}>
                    <DragDropList tasklist={selectedTasklist} handleTaskAdded={handleTaskAdded} setTasklist={setSelectedTasklist}/>
                </Box>
            </Box>
        </>
    );
}

export default ListView;
