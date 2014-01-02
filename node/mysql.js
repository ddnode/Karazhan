var mysql = require('mysql');
//本地
var db = mysql.createConnection({
	host:'127.0.0.1',
	port:'3306',
	database:'xiangwenwen',
	user:'root',
	password:'0723'
});
db.connect();
//服务器
// var db = mysql.createConnection({
// 	host:'127.0.0.1',
// 	port:'3306',
// 	database:'wenren',
// 	user:'wenren',
// 	password:'wenren!@#'
// });
module.exports = db;