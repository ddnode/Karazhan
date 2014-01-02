var http = require('http');
var fs = require('fs');
var urls =require('url');
var db = require('./mysql');
//主服务器
http.createServer(function (request,response){
	var url = request.url;
	var xhr = request.headers['x-requested-with'];
	if(!xhr){
		//静态文件服务器
		if(url !== '/favicon.ico'){
			fs.readFile('static'+ url,function(err,file){
				if(err){
					response.writeHead(404);
					response.end('not find page');
					return false;
				}
				response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
				response.end(file);
			});
		}
	}else{
		//路由
		var route = {
			"/getUser":function(){
				db.query('SELECT * FROM user',function(err,rows,fields){
					if(err){
						response.writeHead(404,{'Content-Type':'application/json;charset=utf-8'});
						var json = JSON.stringify({
							"error":"错误信息"
						});
	    				response.end(json);
						return false;	
					}
					response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});
					var json = JSON.stringify(rows);
    				response.end(json);
				});
			},
			"/postUser":function(postData){
				var json = JSON.parse(postData);
				console.log(json.username);
				console.log(json.userpass);
				db.query('INSERT INTO `user`(`username`,`userpass`) VALUES ("'+json.username+'","'+json.userpass+'")',function(err,data){
					console.log(err);
					if(err){
						response.writeHead(404,{'Content-Type':'application/json;charset=utf-8'});
						var json = JSON.stringify({
							"error":"错误信息"
						});
	    				response.end(json);
						return false;
					}
					response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});
					var json = JSON.stringify({
						"build":"成功"
					});
    				response.end(json);
				});
			}
		}
		request.setEncoding("utf8");
		var all = urls.parse(url);
		//ajax请求监听
		if(xhr.toLowerCase() == 'xmlhttprequest'){
			var xhrMethod = request.method;
			switch(xhrMethod){
				case 'GET' : 
					var pathname = all.pathname;
					var search = all.search;
					if(!route[pathname]){
						response.writeHead(404,{'Content-Type':'application/json;charset=utf-8'});
						var json = JSON.stringify({
							"error":"错误信息"
						});
	    				response.end(json);
						return false;
					}
					if(!search){
						route[pathname]();
						return;
					}
					break;
				case 'POST':
					var postData = '';
					var pathname = all.pathname;
					request.addListener('data',function(data){
						postData += data;
					});
					request.addListener('end',function(){
						if(!route[pathname]){
							response.writeHead(404,{'Content-Type':'application/json;charset=utf-8'});
							var json = JSON.stringify({
								"error":"错误信息"
							});
		    				response.end(json);
							return false;
						}
						route[pathname](postData);
					});
					break;
			}
		}
	}
}).listen(8000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8000/');