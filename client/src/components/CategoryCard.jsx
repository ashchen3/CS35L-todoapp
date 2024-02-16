import { Card, CardContent, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import React from "react";

/**
 * Some styles for a single Card.
 */
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    // padding: theme.spacing(1),
    textAlign: "center",
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
                <CardContent>
                    <Typography variant="h5">{props.category}</Typography>
                </CardContent>
            </Card>
        </Item>
    );
}

export default CategoryCard;
