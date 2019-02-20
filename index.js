var d = require('./diskinfo');
const express = require('express')
const app = express()
const port = 3000

app.use("/", express.static(__dirname + '/site/'));
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/site/index.html');
});
app.get('/getSpace', (req, res) => {
	d.getDrives(function(err, aDrives) {
		var list = [];
		for (let i = 0; i < aDrives.length; i++) {
			const element = aDrives[i];
			if(element.mounted == "/" || element.mounted == "/home/mukuduk/2tb" || element.mounted == "/home/mukuduk/1500gb"){
				list.push(element);
			}
		}
		res.send(aDrives);
	});
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
