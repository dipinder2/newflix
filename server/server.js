const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require("fs")
require('dotenv').config();

require("./config/mongoose.config");


app.use(express.json(), express.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');

app.use(cookieParser());
// Change the app.use(cors()) to the one below
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


const AllMyUserRoutes = require("./routes/user.routes");
AllMyUserRoutes(app);
app.get("/api/video/:id",(req,res)=>{
	const path = 'videos/movie.mp4'
	const stat = fs.statSync(path)
	const fileSize = stat.size
	const range = req.headers.range
	 
	if (range) {
		const parts = range.replace(/bytes=/, "").split("-")
		const start = parseInt(parts[0], 10)
		const end = parts[1]
		? parseInt(parts[1], 10)
		: fileSize-1
		 
		const chunksize = (end-start)+1
		const file = fs.createReadStream(path, {start, end})
		const head = {
		'Content-Range': `bytes ${start}-${end}/${fileSize}`,
		'Accept-Ranges': 'bytes',
		'Content-Length': chunksize,
		'Content-Type': 'video/mp4',
		}
		 
		res.writeHead(206, head)
		file.pipe(res)
	} 
	else {
		const head = {
		'Content-Length': fileSize,
		'Content-Type': 'video/mp4',
		}
		res.writeHead(200, head)
		fs.createReadStream(path).pipe(res)
	}
});


app.listen(8000, () => console.log("The server is all fired up on port 8000"));
