import express from "express";
import cors from "cors";

const app = express();

app.use(express.json);
app.use(cors());

app.get("/api/reminders", async (req, res)=> {
    console.log("Received GET request on /api/reminders");
    res.json({message: "Success!"});
});

app.listen(3000, () => {
    console.log("server running on localhost:3000");

});