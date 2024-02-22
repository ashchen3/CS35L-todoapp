import { Card, CardContent, Typography } from "@mui/material";
import { Button, CardActionArea, CardActions } from '@mui/material';
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import React from "react";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";

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
 * A single Card component that displays the list's category.
 */
// TODO: add more fields
function CategoryCard({ props }) {
    return (
        <Item>
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography variant="h6">
                            {props.category}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" startIcon={<AddCircleOutline />}>Add Task</Button>
                </CardActions>
            </Card>
        </Item>
    );
}

export default CategoryCard;
