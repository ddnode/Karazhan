grunt----学习用例，前端文件系统分析

### 准备工作： ###

1.安装nodejs环境

2.安装grunt环境  npm install -g grunt-cli

3.在项目中配置package.json和Gruntfile.js文件

###正确书写package.json配置文件：###
package.json是一个json文件，可自由配置书写，个别字段，需要参照官网的例子。

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

###Gruntfile.js文件书写：###
grunt默认任务，已经被我重置，运行grunt将开启对整个项目的前端文件检查，并输出.txt日志文件。其他任务，可以根据官网的用例，分配命令，用来对各自的项目，分配压缩，合并，代码检查，单元测试等。

	grunt.initConfig({  //配置方法
	    
	});
	//定制task
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//分配命令执行
	grunt.registerTask('yanex',['concat:yanex','uglify:yanex']);

###项目中js文件配置：###
只能用于用户js，插件不算，程序会自动过滤.min文件。第一行配置json，用注释//{"name":"","author":""}，此json为严格模式，未来将增加多个字段功能。name：此js文件用于那个页面，author：编写此js文件的开发人员名字。
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