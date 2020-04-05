const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
var path  = require('path');
const youtubedl = require("youtube-dl");

const app = express();

app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname,'views')))


app.listen(5000, () => {
	console.log('Server Works !!! At port 5000');
});

app.get('/',(req,res)=> {
	res.sendFile('index.html');
})

app.get('/downloadmp3', (req,res) => {
	var url = req.query.url;

	 let vid = youtubedl.getInfo(url, function (err, info) {

		    if (err) throw err  
		


				var videoName = info.title.replace('|','').toString('ascii');
				return videoName
				
				// res.header('Content-Disposition', 'attachment; filename="video.mp3"');
				// ytdl(url, {
				// 		format: 'mp3',
				// 		filter: 'audioonly'
				// 	}).pipe(res);
				});

				console.log(vid)
        
    });
	

app.get('/downloadmp4', (req,res) => {
	var url = req.query.url;
	res.header('Content-Disposition', 'attachment; filename="video.mp4"');
	ytdl(url, {
		format: 'mp4'
	}).pipe(res);
});