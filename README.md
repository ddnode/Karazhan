grunt----学习用例，前端文件系统分析

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
由于默认任务grunt已经被我重置成自己的任务，因此在运行grunt时的任务，是自己写的一个工具，用法需要在用户js文件中配置相应的json信息，提供给项目管理者查看，js的一些信息，提供参考。程序会自动过滤.min文件。第一行配置json，用注释//{"name":"","author":""}，此json为严格模式，未来将增加多个字段功能。name：此js文件用于那个页面，author：编写此js文件的开发人员名字。
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