import express from "express";
import cors from "cors";
import { generateMessage } from "./openai.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/generatePrep", async (req, res) => {
  const { input, filters } = req.body;
  if ((!input && !input.length) || (!filters && !filters.length)) {
    return res.status(400).json({ error: "invalid request body." });
  }

  try {
    const response = await generateMessage(input, filters);
    res.json({ data: response });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.get("/", (req, res) => {
  res.send("Hello from JunoAI server!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
