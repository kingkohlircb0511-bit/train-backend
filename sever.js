import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/status", async (req, res) => {
  const { trainNo, date } = req.query;

  if (!trainNo || !date) {
    return res.status(400).json({ error: "Missing trainNo or date" });
  }

  const url = `https://indian-railway-irctc.p.rapidapi.com/api/trains/v1/train/status?trainNo=${trainNo}&date=${date}`;

  try {
    const response = await fetch(url, {
      headers: {
        "x-rapidapi-host": "indian-railway-irctc.p.rapidapi.com",
        "x-rapidapi-key": "PASTE_YOUR_RAPIDAPI_KEY_HERE"
      }
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "API failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
