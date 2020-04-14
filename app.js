const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
var path  = require('path');
const getID = require('./views/getID');

const app = express();

app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname,'views')))


app.listen(5000, () => {
	console.log('Server Works !!! At port 5000');
});

app.get('/',(req,res)=> {
	res.sendFile('index.html');
})


app.get('/getformat',async (req,res) => {
  var url = req.query.url

  let videoID =getID(url);

  const data = await ytdl.getBasicInfo(videoID);
  let format = data.formats

  console.log(format)
})

app.get('/downloadmp3', async (req,res) => {
	var url = req.query.url;
	// var videoName = info.title.replace('|','').toString('ascii');
  // return videoName

  let videoID = getID(url);

  console.log(videoID)
  
  
  const data = await ytdl.getBasicInfo(videoID);
  const displayName = data.title;
  var videoName = displayName.replace('|','').toString('ascii');
  const format = data.formats[1]

  console.log(format)

  // console.log(videoID)

  res.attachment(`${videoName}.mp3`);


  // res.header('Content-Disposition', 'attachment; filename="video.mp3"');
	// ytdl(url, {
	// 		format: 'mp3',
	// 		filter: 'audioonly'
	// 		}).pipe(res);
});



app.get('/downloadmp4', async (req,res) => {
  var url = req.query.url;
	// var videoName = info.title.replace('|','').toString('ascii');
  // return videoName

  let videoID = getID(url);

  console.log(videoID)
  
  const data = await ytdl.getBasicInfo(videoID);
  const displayName = data.title;

  res.attachment(`${displayName}.mp4`);

  // res.header('Content-Disposition', 'attachment; filename="video.mp3"');

  ytdl.getInfo(videoID, (err, info) => {
    if (err) throw err;
    let format = ytdl.chooseFormat(info.formats, { quality: '18' });
    let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    console.log(audioFormats)
    if (format) {
      console.log(format)
      console.log('Format found!');
    }
    ytdl(url,{
      format:format,
      filter:'audioandvideo'
    }).pipe(res)
  });
	// ytdl(url, {
  
  //   format : {
  //     quality : 'highest',
  //     url:url,
  //     container: 'mp4'
  //   }
	// 		}).pipe(res); 
});