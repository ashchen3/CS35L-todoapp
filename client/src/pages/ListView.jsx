import { Box, Typography } from "@mui/material";
import DragDropList from "../components/DragDropList";

function ListView({ categoryProp }) {
    const category = "groceries"; // TEMP

    return (
        <Box sx={{ px: 5, bgcolor: "primary.background", height: "100%" }} id="home">
            <Typography variant="h4" sx={{ py: 1 }}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
            </Typography>
            <Box sx={{ height: "90%" }}>
                <DragDropList category={category} />
            </Box>
        </Box>
    );
}

export default ListView;
