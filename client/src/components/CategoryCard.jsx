import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

function CategoryCard(props) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Groceries</Typography>
            </CardContent>
        </Card>
    );
}

export default CategoryCard;
