import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import React from "react";

import CategoryCard from "../components/CategoryCard";
import ProfileIcon from "../components/ProfileIcon";
import SearchBar from "../components/SearchBar";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    // padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const GridItem = () => {
    return (
        <Grid xs={10} sm={6} md={4}>
            <Item>
                <CategoryCard />
            </Item>
        </Grid>
    );
};

function HomeView() {
    return (
        <Box sx={{ px: 5, py: 1 }}>
            <Box sx={{ display: "flex" }}>
                <SearchBar />
                <ProfileIcon />
            </Box>

            <Grid
                container
                rowSpacing={{ xs: 1, sm: 2 }}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                <GridItem />
                <GridItem />
                <GridItem />
                <GridItem />
                <GridItem />
                <GridItem />
            </Grid>
        </Box>
    );
}

export default HomeView;
