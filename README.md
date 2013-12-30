# Karazhan #

此项目用于收集nodejs，mongodb学习资料。

grunt----学习用例，前端文件系统分析。

其他学习资料

## 中文API收集 ##

nodejs <a href="http://nodeapi.ucdok.com/#/api/">http://nodeapi.ucdok.com/#/api/</a>

express3.* <a href="http://expressjs.jser.us/">http://expressjs.jser.us/</a>

Juicer <a href="http://juicer.name/docs/docs_zh_cn.html">http://juicer.name/docs/docs_zh_cn.html</a>

Meteor <a href="http://d0cs.meteor.com/">http://d0cs.meteor.com/</a>

Jade <a href="http://expressjs.jser.us/jade.html">http://expressjs.jser.us/jade.html</a>

## NODE资料 ##

node.js入门中文版  <a href="http://nodebeginner.org/index-zh-cn.html">http://nodebeginner.org/index-zh-cn.html</a>

深入理解Express  <a href="http://xvfeng.me/posts/understanding-expressjs/">http://xvfeng.me/posts/understanding-expressjs/</a>

NodeJS 和 Socket.io 中文入门教程  <a href="http://t.cn/zOMwxCg">http://t.cn/zOMwxCg </a>

Mongoose 基本功能使用  <a href="http://t.cn/zOIKPeB ">http://t.cn/zOIKPeB </a>

让我们基于Node.js创建一个Web应用系列(5篇) <a href="http://t.cn/z8JnzkA ">http://t.cn/z8JnzkA </a>

一周node.js系列(7篇)  <a href="http://t.cn/zOKuc9D">http://t.cn/zOKuc9D</a> 

从零开始nodejs系列  <a href="http://blog.fens.me/series-nodejs/ ">http://blog.fens.me/series-nodejs/ </a>

一起学node.js (荐)  <a href="http://t.cn/zHxNXXt">http://t.cn/zHxNXXt</a> 

Node.js高级编程(荐)  <a href="http://t.cn/zYmuqaH">http://t.cn/zYmuqaH</a> 

深入浅出Node.js <a href="http://www.infoq.com/cn/master-nodejs">http://www.infoq.com/cn/master-nodejs</a> 

Node.js零起点开发 <a href="http://blog.csdn.net/kaosini/article/details/8084268">http://blog.csdn.net/kaosini/article/details/8084268</a> 

node.js入门(共13篇) <a href="http://www.cnblogs.com/softlover/category/406516.html">http://www.cnblogs.com/softlover/category/406516.html</a> 

snoopyxdy的博客(大量node及express api的解读及进阶内容) <a href="http://t.cn/zQuKMKH">http://t.cn/zQuKMKH </a>

用node.js写web框架系列  <a href="http://my.oschina.net/Jeky/blog?catalog=262655">http://my.oschina.net/Jeky/blog?catalog=262655</a> 

Luics的node.js系列  <a href="http://t.cn/zjATQlf">http://t.cn/zjATQlf</a> 

使用node.js建博客 <a href="http://witcheryne.iteye.com/blog/1172069">http://witcheryne.iteye.com/blog/1172069</a> 

用socket.io 搭建聊天室: <a href="https://github.com/nswbmw/N-chat/wiki/_pages">https://github.com/nswbmw/N-chat/wiki/_pages</a> 


##社区##

cnodejs <a href="http://cnodejs.org/">http://cnodejs.org/</a>

## Grunt ##

### 准备工作： ###

1.安装nodejs环境，<a href="http://www.nodejs.org/">下载地址</a>。

2.安装grunt环境  npm install -g grunt-cli

nodejs安装完成之后，可以cmd的命令行中输入node --version查看版本信息。grunt也可以在cmd的命令行中输入grunt --version查看其版本信息，来确定是否安装成功。如果命令行，不可用，配置环境变量，<a href="https://www.google.com.hk/">如何配置环境变量---google</a>。

3.在项目中配置package.json和Gruntfile.js文件

建议把package.json,Gruntfile.js文件，放置在项目根目录下，来全局把握项目。

###正确书写package.json配置文件###
	{
	 	"name":"webapp",  //项目根目录
	    "author":"xiangwenwen",
	    "devDependencies": {  //配置grunt插件
	        "grunt": "~0.4.0",
	        "grunt-contrib-jshint": "~0.7.1 ",
	        "grunt-contrib-uglify": "~0.1.2",
	        "grunt-contrib-concat": "~0.1.1"
	    },
	    "address":{  //文件分析地址
	    	"yanex":"controller/yanex/",
	    	"open":"controller/open/"
	    }
	}
package.json是一个json文件，所有的配置定义，都是写在package.json文件，其中除了个别字段需要跟官网一致，其余可自由配置。
name：项目名，根目录名字。devDependencies：插件配置项。<a href="https://npmjs.org/doc/json.html">复制上面的案例，并根据需要做扩充，参考此</a>
###正确书写Gruntfile.js###
grunt默认任务，已经被我重置，运行grunt将开启对整个项目的前端文件检查，并输出.txt日志文件。其他任务，可以根据官网的用例，分配命令，用来对各自的项目，分配压缩，合并，代码检查，单元测试等。grunt是基于nodejs来做开发的，所以在Gruntfile.js文件中，所书写的grunt代码需要放置在module中，如：
	
	module.exports = function(grunt) {
		//grunt {可以把它当为此函数的全局对象，我们所有的grunt代码都要从此.出来。}
    }

###简单任务配置###
初始化配置方法，grunt.initConfig()，参数为一个object。

	grunt.initConfig({  //配置方法
	    
	});
	
加载相应的插件，使用grunt.loadNpmTasks来加载相应的插件。

	//定制task
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

启动任务，使用grunt.registerTask来启动相应的任务。

	grunt.registerTask('default',['uglify']);

在cmd命令工具中，输入grunt，将执行uglify。

###复杂任务配置###

假设在系统中存在yanex，purse两个大项目，现在我分别配置相应命令来启动任务，并使用通配符来大批量的获取文件，启用jshint来执行代码检查，uglify来执行压缩。

初始化配置方法，grunt.initConfig()，参数为一个object。

	grunt.initConfig({
		 //配置jshint代码检查
		jshint:{
			yanex:{
                files:[
                    {
                        expand: true,
                        cwd: '<%=pkg.address.yanex%>', 
                        src: ['./*.js']
                    }
                ]  //将查找yanex目录下的所有.js文件
            },
            purse:{
                files:[
                    {
                        expand:true,
                        cwd:'<%=pkg.address.purse%>',
                        src:['./*.js']
                    }
                ]
            }
		},
		uglify:{
			yanex:{        //分配项目运行命令 
                options:{
                    banner:'<%=banner%>' //这个banner是注释插入在新文件中
                },
                files:[ //压缩yanex所有的.js到resources目录中
                    {
                        expand: true,
                        cwd: '<%=pkg.address.yanex%>',
                        src: ['./*.js'],
                        dest: '<%=pkg.address.yanex%>resources/',                         
                        ext: '.min.js',
                    },
                    {  //压缩concat目录中合并的文件到resources目录中
                        expand: true,
                        cwd: '<%=pkg.address.yanex%>concat/',
                        src: ['./*.js'],
                        dest: '<%=pkg.address.yanex%>resources/',                         
                        ext: '.min.js', 
                    }
                ]
            },
			purse:{
                options:{
                    banner:'<%=banner%>'
                },
                files:[
                    {
                        expand:true,
                        cwd:'<%=pkg.address.purse%>',
                        src:['./*.js'],
                        dest:'<%=pkg.address.purse%>resources/',
                        ext:'.min.js'
                    }
                ]
            }
		}	
    })
	//定制task
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //项目yanex分配命令执行
    grunt.registerTask('yanex',['concat:yanex','uglify:yanex']);
    grunt.registerTask('jsyanex',['jshint:yanex']);
    //项目purse分配命令执行
    grunt.registerTask('purse',['uglify:purse']);
    grunt.registerTask('jspurse',['jshint:purse']);

那如果运行grunt yanex，将执行yanex的文件合并与压缩。如果运行grunt jsyanex将对yanex目录中的js文件开始代码检查，如果运行purse，将压缩purse目录中的js文件，如果运行jspurse将对purse目录中的js开始代码检查。

分配的命令，可以从代码中看见，与配置函数中的分配名一致，uglify:yanex，意味着，将执行在配置函数中uglify中的yanex这个json区域。而通配符的描述，可以参考，<a href="http://www.gruntjs.net/docs/configuring-tasks/">文档</a>只需要明白用法即可。

###项目中额外的文件配置：###
由于默认任务grunt已经被我重置成自己的任务，因此在运行grunt时的任务，是自己写的一个工具，用法需要在用户js文件中配置相应的json信息，提供给项目管理者查看，js的一些信息，提供参考。程序会自动过滤.min文件。第一行配置json，用注释//{"name":"","author":""}，此json为严格模式，未来将增加多个字段功能。

name：此js文件用于那个页面。

author：编写此js文件的开发人员名字。

file：此文件名。

mail：开发人员的邮箱。

###日志输出文件：##

	2013-11-03T13:22:19
	Project name：yanex
	Resources file name：yanex.html
	[-----资源分析建议-----合并文件]  file：controller/yanex/apache.js  rows：3行  author：wenren
	[-----资源分析建议-----合并文件]  file：controller/yanex/de.js  rows：3行  author：向文文
	[-----资源分析建议-----合并文件]  file：controller/yanex/demo.js  rows：4行  author：向文文
	[-----资源分析建议-----合并文件]  file：controller/yanex/wind.js  rows：3行  author：wenren
	Resources file name：wow.jsp
	The resources file only one 
	Project name：open
	Resources file name：open.py
	[-----资源分析建议-----分拆模块]  file：controller/open/open_de.js  rows：3037行  author：向文文
	[-----资源分析建议-----合并文件]  file：controller/open/open_demo.js  rows：51行  author：向文文

## require.js 编译##

1,下载r.js放置在项目根目录下

2,以项目require为例子讲解，如何运行r.js

目录结构如下：

   app - weixin - *.js

   require.js

   r.js

   index.html

在index.html中，我是如此引用require.js的。

	require.config({
		baseUrl:'app/weixin/main',
		paths:{
			jquery:'http://127.0.0.1/require/libs/jquery'
		}
	});
	require(['main'],function(main){
		main.init();
	});

我在main中如此定义我的模块，main模块中依赖了config模块。

	define(["./config"],function(config){
		return{
			init:function(){
				console.log(config.max)
			}
		}
	});

我在config模块中如此定义：

	define(function(){
		return{
			max:"HUGHJFHDJKSHFJ"
		}
	});

我的配置build.js放置在app/weixin目录中，它如此定义：

	({
		baseUrl:'./',
		name:'main',
		out:'main/main.js'
	})

如果我在根目录，也就是require目录，准备运行app/weixin/build.js配置，那么相对于此文件，我的baseUrl就是'./'。

baseUrl：相对路径

name：入口文件

out：生成的目标文件

removeCombined：如果为true，优化器（optimizer）将从输出目录中删除已合并的文件。

shim：为那些没有使用define()声名依赖关系及设置模块值的模块，配置依赖关系与“浏览器全局”出口的脚本。

打开命令行工具，输入node r.js -o app/weixin/build.js，现在就自动构建了一个main.js在main目录中，上传时不要忘记了修改index.html页面中的baseUrl。

##r.js资料##

<a href="http://www.oschina.net/translate/optimize-requirejs-projects">http://www.oschina.net/translate/optimize-requirejs-projects</a>

<a href="https://github.com/jrburke/r.js">https://github.com/jrburke/r.js</a>

<a href="https://github.com/xueduany/r.js">https://github.com/xueduany/r.js</a>

<a href="https://github.com/xiangwenwe/r.js/blob/master/build/example.build.js">r.js匹配参数查看</a>

## github入门简介 ##

以githubfororder项目为例，从建立项目到如何pull远程分支，更新远程代码。

1，在github建立一个新项目，名为githubfororder，如：create a new repo。

2，建立新项目之后，github会给予一个ssh地址，保存这个地址。

##建立仓库##

###把远程项目仓库clone到本地###

git clone git@github.com:xiangwenwe/githubfororder

###建立README.md文件###

touch README.md

###初始化项目###

git init

###把README.md文件提交到远程仓库###

git add README.md

git commit -m "add README.md 13.31"

git push origin master

###查看本地仓库文件###

git ls-files

###查看提交###
git show 

##远程仓库更新到本地##

git remote -v  //查看仓库源

cd githubfororder //进入本地githubfororder仓库

git fetch origin master //从远程仓库更新代码到本地仓库

## Pull Requests ##

在github上fork别人的项目。

git clone git@github.com:xiangwenwe/githubfororder clone远程项目到本地。

假设我们修改README.md文件。

git add README.md

git commit -m "update README.md time 17.09"

git push origin master

到此，我们修改的README.md文件已经被提交到自己的远程仓库中。打开github页面，找到右上角的Pull Requests按钮

点击此按钮，添加日志信息：为什么要提交此次修改，作者看见后会评估是否需要。

## weinre远程调试 ##

>npm install -g weinre  安装weinre

>在相应的目录中输入：weinre --httpPort 8080[端口号任意] --boundHost -all-

在调试页面，载入一个weinre的js文件。

资料：<a href="http://js8.in/2013/11/20/%E4%BA%94%E4%B8%AA%E4%BD%A0%E5%BF%85%E9%A1%BB%E7%9F%A5%E9%81%93%E7%9A%84javascript%E5%92%8Cweb-debug%E6%8A%80%E6%9C%AF/">远程调试</a>

## mobile##
<a href="https://github.com/EightMedia/hammer.js">https://github.com/EightMedia/hammer.js</a>

<a href="http://jinlong.github.io/blog/2013/09/23/safari-ios7-html5-problems-apis-review/">iOS 7 的 Safari 和 HTML5：问题，变化和新 API</a>

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects">ES5 API</a>

##加密||解密##

服务端使用php，前端使用js，双向加密解密。

<a href="http://us3.php.net/mcrypt">mcrypt</a>

<a href="https://code.google.com/p/crypto-js/">crypto-js</a>

<a href="https://github.com/xiangwenwe/Karazhan/tree/master/encryption">加密解密demo</a>