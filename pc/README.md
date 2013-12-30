桌面互联网开发技术，选择了使用jQuery,underscore,bootstarp,backbone四种框架为基础框架，而复杂单页面应用时，可开启backbone的支持。对于体系流程中，wanyan的目录结构非常重要，对此，目录结构会有一份详细的额外说明文档。

目录结构

app //页面文件，如：.html .jsp .php等

	--yanex //具体项目目录

controller //用户js文件

	--yanex //具体项目目录

css //css文件

	--plug //插件css目录

	--yanex //具体项目目录

data //模拟数据

libs //库文件

	-- plug //插件js目录

log //前端系统文件分析日志，错误日志等

node_modules //grunt插件

cgi-bin

test //单元测试文件

Gruntfile.js //grunt初始化文件

package.json //grunt配置文件

nagrand.bat //定位到此项目的cmd

server.py //python web 服务器简化版

nagrand 核心文件加载模块


###桌面互联网应用程序开发流程###

开发流程的前提准备，在app，controller，css目录中，放置项目yanex项目目录，分别在三个目录中，建立yanex.html，yanex.js，yanex.css文件，它们构成了一个应用程序的基础元件。

打开yanex.html文件，在头部引入<a href="https://github.com/UnableToParse/nagrand">nagrand.js</a>，并在标签中配置项目route，usercss属性，如：

	<script type="text/javascript" src="webapp/libs/nagrand.js" usercss="top|yanex" route="yanex"></script>

在body底部，编写执行配置函数，如：

	<script type="text/javascript">
	    nagrand.config({
	        library:['resources/jquery.min','resources/underscore.min','resources/wy.min','resources/bootstrap.min'],
	        use:['resources/yanex.min']
	    });
	</script>
上述两个步骤，简单构成了一个应用程序所需要的加载准备。

现在打开yanex.js，第一行使用短注释//，//{"name":"yanex.html","author":"wenren"}标识此文件的使用范围，开发者json。使用define包装，把程序代码包装在此define中，如：

	nagrand.main.define('yanex',function(){
	    this.initialize = function(){}
	});

###产品开发流程###

考虑到restful，前端开发的流程，需要使用underscore来渲染模板。从端到端的对应，先出合理的结构-交互-模板渲染-业务逻辑的实现-代码检查-测试-发布。

###自动化###

前端产品的部署，需要更加智能的解决方案，因此使用Grunt来解决此问题。

学习<a href="http://gruntjs.com/">Grunt</a>。

学习wanyan项目的Gruntfile.js