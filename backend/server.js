import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import eventsRouter from "./routes/events.js";
import webhooksRouter from "./routes/webhooks.js";
import clientsRouter from "./routes/clients.js";

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://algohire-bru9.vercel.app"
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

app.use("/webhooks", webhooksRouter);
app.use("/events", eventsRouter);
app.use("/clients", clientsRouter);

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
