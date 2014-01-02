var mysql = require('mysql');
var db = mysql.createConnection({
	host:'127.0.0.1',
	port:'3306',
	database:'xiangwenwen',
	user:'root',
	password:'0723'
});
db.connect();
var t = new Date();
var ft = t.getTime();
db.query('SELECT * FROM user',function(err,rows,fields){
	if(err){
		console.log(err);
		return false;	
	}
	var s = new Date();
	var all = s.getTime() - ft;
	console.log(all + 'ms');
	console.log(all/1000 +'s');
	console.log(rows);
	rows.forEach(function(v){
		console.log(v);
	});
});
db.end();
module.exports = db;