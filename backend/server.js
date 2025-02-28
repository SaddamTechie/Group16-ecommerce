import express from 'express'; 
import { connectDB } from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from "node:path"
import router from './routes/product.route.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();

app.use(cors());
app.use(express.json()); //allows us to accept JSON data in the req.body;

app.use("/api/products",router)

if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname,"/frontend/build")));

   app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
   })
}

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server Started at http://localhost:${PORT}`);
})
